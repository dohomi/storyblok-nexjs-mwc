export function getImagePromise({ src, srcSet }) {
  return new Promise((resolve, reject) => {
    getImage({
      src,
      srcSet,
      onReady(src: string) {
        resolve(src)
      },
      onError(e: any) {
        reject(e)
      }
    })
  })
}

export function getImage({ src = '', srcSet = '', onReady, onError }: {
  src: string
  srcSet: string
  onReady?: Function
  onError?: Function
}) {
  let img = new Image()
  img.src = src
  img.srcset = srcSet || src
  // img.crossOrigin = 'anonymous'
  img.onload = () => {
    onReady && onReady(img.currentSrc || img.src) // return current selected source
    img = null // dispose image element
  }
  img.onerror = (e) => {
    onError && onError(e)
    img = null
  }
}
