import parser from 'ua-parser-js'

class DeviceDetect {
  private device: { os: any; browser: any; version: number; device: any }
  private hasWebpSupport: boolean
  private language: string

  constructor() {
    this.device = null
    this.hasWebpSupport = false
    this.language = null
  }

  getDevice() {
    return this.device
  }

  setAppServices(req?) {
    this.setDevice(req)
    this.setWebpSupport(req)
  }

  /**
   *
   * @return {null}
   */
  getLanguage() {
    return this.language
  }

  /**
   *
   * @param {string} language
   * @param {array|string} audienceLanguages
   * @param {object} [res]
   */
  setLanguage(language, audienceLanguages, res) {
    if (language) {
      this.language = language
    }
    if (res && audienceLanguages) {
      res.setHeader('Content-Language', Array.isArray(audienceLanguages) ? audienceLanguages.join(',') : audienceLanguages)
    }
  }

  /**
   *
   * @param parsed
   * @return {{os: string, browser: *, version: number, device: *}}
   * @private
   */
  _getDeviceValues(parsed) {
    return {
      browser: parsed.browser.name,
      version: parseInt(parsed.browser.major),
      os: parsed.os.name,
      device: parsed.device.type
    }
  }

  /**
   * on server pass req. leave blank if called on client
   * @param req
   */
  setDevice(req) {
    if (req) {
      // we set this and calling it in _document to set global windows variable
      let userAgent = req.headers['user-agent']
      const parsed = userAgent && parser(userAgent)
      this.device = this._getDeviceValues(parsed)
    } else {
      this.device = this._getDeviceValues(parser())
      window['userDevice'] = { ...this.device }
    }
  }

  /**
   *
   * @return {null}
   */
  getWebpSupport() {
    return this.hasWebpSupport
  }

  /**
   * on server pass req. leave blank if called on client
   * @param req
   */
  setWebpSupport(req) {
    if (req) {
      // we set this and calling it in _document to set global windows variable
      this.hasWebpSupport = req.headers.accept && req.headers.accept.includes('webp')
    } else {
      this._supportsWebp()
        .then((can: boolean) => {
          this.hasWebpSupport = can
          window['hasWebpSupport'] = can
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
