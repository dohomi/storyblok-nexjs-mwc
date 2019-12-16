import { IncomingMessage, ServerResponse } from 'http'
import { isMobile } from 'is-mobile'

export type DeviceDetectModule = {
  device: {
    device: string,
    width: number
  },
  hasWebpSupport: boolean
}

type AppDevice = {
  device?: 'mobile' | 'tablet' | null
  width: number
}

class DeviceDetect {
  private device: AppDevice
  private hasWebpSupport: boolean
  private language: string

  constructor() {
    this.device = {
      device: null,
      width: 0
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

  setLanguage(language?: string, audienceLanguages?: string | string[], res?: ServerResponse) {
    if (language) {
      this.language = language
    }
    if (res && audienceLanguages) {
      res.setHeader('Content-Language', Array.isArray(audienceLanguages) ? audienceLanguages.join(',') : audienceLanguages)
    }
  }

  setDevice(req?: IncomingMessage) {
    let userAgent = req && req.headers['user-agent']
    const mobileDevice = isMobile({ ua: userAgent })
    const tabletDevice = isMobile({ ua: userAgent, tablet: true })
    const obj: AppDevice = {
      width: 1080
    }
    if (mobileDevice) {
      obj.device = 'mobile'
      obj.width = 599
    } else if (tabletDevice) {
      obj.width = 959
      obj.device = 'tablet'
    }
    this.device = obj
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
