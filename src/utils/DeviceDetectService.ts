import { IncomingMessage, ServerResponse } from 'http'

const nodeParser = require('ua-parser-js')

export type DeviceDetectModule = {
  device: {
    os: string,
    browser: string,
    device: string,
    width: number
  },
  hasWebpSupport: boolean
}

class DeviceDetect {
  private device: {
    os: any; browser: any; device: any, width: number
  }
  private hasWebpSupport: boolean
  private language: string

  constructor() {
    this.device = {
      os: null,
      browser: null,
      device: null,
      width: 0
    }
    this.hasWebpSupport = false
    this.language = ''
  }

  getDevice() {
    return this.device
  }

  reinitAppServices(values: DeviceDetectModule) {
    if (values) {
      this.device = values.device
      this.hasWebpSupport = values.hasWebpSupport
    }
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
    const device = parsed.device.type
    const obj = {
      browser: parsed.browser.name,
      os: parsed.os.name,
      device: device,
      width: 1080
    }
    if (device === 'mobile') {
      obj.width = 599
    } else if (device === 'tablet') {
      obj.width = 959
    }
    return obj
  }

  setDevice(req?: IncomingMessage) {
    let userAgent = req ? req.headers['user-agent'] as string : window.navigator.userAgent
    const parsed = userAgent && nodeParser(userAgent)
    this.device = this._getDeviceValues(parsed)
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
      const image = new Image()
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
