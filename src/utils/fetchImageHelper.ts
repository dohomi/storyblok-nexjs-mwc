export function getImagePromise({ src, srcSet }) {
  return new Promise((resolve, reject) => {
    getImage({
      src,
      srcSet,
      onReady(src) {
        resolve(src)
      },
      onError(e) {
        reject(e)
      }
    })
  })
}

export function getImage({ src = '', srcSet = '', onReady, onError = undefined }) {
  let img = new Image()
  img.src = src
  img.srcset = srcSet || src
  img.crossOrigin = 'anonymous'
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
