/**
 *
 * @param src
 * @return {Promise<any>}
 */
export function fetchImageSource (src) {
  return new Promise((resolve, reject) => {
    fetch(src.replace('//', 'https://'), {
      mode: 'no-cors'
    }).then(() => {
      resolve(src)
    }).catch(e => {
      reject(e)
    })
  })
}
