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
      // we currently don't do anything.. needs testing though..
      // let can = this._supportsWebp() // not sufficient yet
      // console.log('is client browser sniffing', can, window.hasWebpSupport)
    }
  }

  // _supportsWebp () {
  //   // credits: https://github.com/bfred-it/supports-webp (does not test correctly firefox 65 and edge
  //   const canvas = typeof document === 'object' ? document.createElement('canvas') : {}
  //   canvas.width = canvas.height = 1
  //   return canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false
  // }
}

const webpInstance = new WebpService()

export default webpInstance
