class WebpService {

  constructor () {
    this.hasWebpSupport = null
  }

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

const webpInstance = new WebpService()

export default webpInstance
