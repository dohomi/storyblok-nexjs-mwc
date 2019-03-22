import FontFaceObserver from 'fontfaceobserver'

const Fonts = () => {

  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css?family=Nunito:300,400,700|Material+Icons'
  link.rel = 'stylesheet'
  document.head.appendChild(link)

  //https://fonts.googleapis.com/css?family=Nunito:300,400,700|Material+Icons
  const fonts = {
    material: new FontFaceObserver('Material Icons', {
      weight: 400
    }),
    nunito: new FontFaceObserver('Nunito', {
      weight: 400
    })
  }
  Promise.all([
    fonts.material.load(),
    fonts.nunito.load()
  ]).then(() => {
    document.documentElement.classList.add('fonts-loaded')
  }).catch(e => {
    document.documentElement.classList.add('fonts-failed')
  })
}
export default Fonts
