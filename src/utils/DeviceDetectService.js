import parser from 'ua-parser-js'

class DeviceDetect {

  constructor () {
    this.device = null
    this.hasWebpSupport = null
    this.language = null
  }

  getDevice () {
    return this.device
  }

  setAppServices (req) {
    this.setDevice(req)
    this.setWebpSupport(req)
  }

  /**
   *
   * @return {null}
   */
  getLanguage () {
    return this.language
  }

  /**
   *
   * @param {string} language
   * @param {array|string} audienceLanguages
   * @param {object} [res]
   */
  setLanguage (language, audienceLanguages, res) {
    if (language) {
      this.language = language
    }
    if (res && audienceLanguages) {
      res.headers['Content-Language'] = Array.isArray(audienceLanguages) ? audienceLanguages.join(',') : audienceLanguages
    }
  }

  /**
   *
   * @param parsed
   * @return {{os: string, browser: *, version: number, device: *}}
   * @private
   */
  _getDeviceValues (parsed) {
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
  setDevice (req) {
    if (req) {
      // we set this and calling it in _document to set global windows variable
      let userAgent = req.headers['user-agent']
      const parsed = userAgent && parser(userAgent)
      this.device = this._getDeviceValues(parsed)
    } else {
      this.device = this._getDeviceValues(parser())
      window.userDevice = {...this.device}
    }
  }

  /**
   *
   * @return {null}
   */
  getWebpSupport () {
    return this.hasWebpSupport
  }

  /**
   * on server pass req. leave blank if called on client
   * @param req
   */
  setWebpSupport (req) {
    if (req) {
      // we set this and calling it in _document to set global windows variable
      this.hasWebpSupport = req.headers.accept && req.headers.accept.includes('webp')
    } else {
      if (this._supportsWebp() || (window.userDevice.browser === 'Firefox' && window.userDevice.version >= 65) ||
        (window.userDevice.browser === 'Edge' && window.userDevice.version >= 18)) {
        this.hasWebpSupport = true
        window.hasWebpSupport = true
      }
    }
  }

  _supportsWebp () {
    // credits: https://github.com/bfred-it/supports-webp (does not test correctly firefox 65 and edge
    const canvas = typeof document === 'object' ? document.createElement('canvas') : {}
    canvas.width = canvas.height = 1
    return canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false
  }
}

const DeviceDetectService = new DeviceDetect()

export default DeviceDetectService
