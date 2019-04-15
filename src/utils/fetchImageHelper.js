/**
 *
 * @param src
 * @return {Promise<any>}
 */
export function fetchImageSource (src) {
  return new Promise((resolve, reject) => {
    fetch(src, {
      mode: 'no-cors'
    }).then(() => {
      resolve(src)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 *
 * @param {string} src
 * @param {string} srcSet
 * @param {function} onReady
 */
export function getImage ({src = '', srcSet = '', onReady}) {
  let img = new Image()
  img.src = src
  img.srcset = srcSet || src
  img.crossorigin = 'anonymous'
  img.onload = () => {
    img.onload = null // dispose
    onReady && onReady(img.currentSrc || img.src) // return current selected source
    img = null // dispose image element
  }
}
