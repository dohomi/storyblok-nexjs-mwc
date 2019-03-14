import parser from 'ua-parser-js'

class DeviceDetect {

  constructor () {
    this.device = null
  }

  getDevice () {
    return this.device
  }

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
}

const DeviceDetectService = new DeviceDetect()

export default DeviceDetectService
