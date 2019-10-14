import parser from 'ua-parser-js'
import { IncomingMessage, ServerResponse } from 'http'

class DeviceDetect {
  private device: { os: any; browser: any; device: any }
  private hasWebpSupport: boolean
  private language: string

  constructor() {
    this.device = {
      os: null,
      browser: null,
      device: null
    }
    this.hasWebpSupport = false
    this.language = ''
  }

  getDevice() {
    return this.device
  }

  setAppServices(req?: IncomingMessage) {
    this.setDevice(req)
    this.setWebpSupport(req)
  }

  getLanguage() {
    return this.language
  }

  setLanguage(language?: string, audienceLanguages?: string, res?: ServerResponse) {
    if (language) {
      this.language = language
    }
    if (res && audienceLanguages) {
      res.setHeader('Content-Language', Array.isArray(audienceLanguages) ? audienceLanguages.join(',') : audienceLanguages)
    }
  }

  _getDeviceValues(parsed: IUAParser.IResult) {
    return {
      browser: parsed.browser.name,
      os: parsed.os.name,
      device: parsed.device.type
    }
  }

  setDevice(req?: IncomingMessage) {
    if (req) {
      // we set this and calling it in _document to set global windows variable
      let userAgent = req.headers['user-agent'] as string

      // @ts-ignore
      const parsed = userAgent && parser(userAgent)
      this.device = this._getDeviceValues(parsed)
    } else {
      // @ts-ignore
      // this.device = this._getDeviceValues(parser())
      // (window as any)['userDevice'] = { ...this.device }
    }
  }

  getWebpSupport() {
    return this.hasWebpSupport
  }

  setWebpSupport(req?: IncomingMessage) {
    if (req) {
      // we set this and calling it in _document to set global windows variable
      this.hasWebpSupport = !!(req.headers.accept && req.headers.accept.includes('webp'))
    } else {
      this._supportsWebp()
        .then((can: any) => {
          this.hasWebpSupport = !!can
          // @ts-ignore
          window['hasWebpSupport'] = !!can
        })
    }
  }

  _supportsWebp() {
    return new Promise(function(resolve) {
      var image = new Image()
      image.onerror = function() {
        return resolve(false)
      }
      image.onload = function() {
        return resolve(image.width === 1)
      }
      image.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA='
    }).catch(function() {
      return false
    })
  }
}

const DeviceDetectService = new DeviceDetect()

export default DeviceDetectService
