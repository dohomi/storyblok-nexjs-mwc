/**
 *
 * @param src
 * @param srcSet
 * @return {Promise<any>}
 */
export function getImagePromise ({src, srcSet}) {
  return new Promise((resolve, reject) => {
    getImage({
      src,
      srcSet,
      onReady (src) {
        resolve(src)
      },
      onError (e) {
        reject(e)
      }
    })
  })
}

/**
 *
 * @param {string} src
 * @param {string} srcSet
 * @param {function} onReady
 * @param {function} onError
 */
export function getImage ({src = '', srcSet = '', onReady, onError}) {
  let img = new Image()
  img.src = src
  img.srcset = srcSet || src
  img.crossorigin = 'anonymous'
  img.onload = () => {
    img.onload = null // dispose
    img.onerror = null
    onReady && onReady(img.currentSrc || img.src) // return current selected source
    img = null // dispose image element
  }
  img.onerror = (e) => {
    img.onload = null // dispose
    img.onerror = null
    onError && onError(e)
    img = null
  }
}
