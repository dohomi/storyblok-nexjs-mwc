import FontFaceObserver from 'fontfaceobserver'

const Fonts = () => {

  const link = document.createElement('link')
  link.href = '/static/font.css'
  link.rel = 'stylesheet'
  document.head.appendChild(link)

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
    console.log('family loaded')
    document.documentElement.classList.add('fonts-loaded')
  }).catch(e => {
    document.documentElement.classList.add('fonts-failed')
    console.error(e)
  })
}
export default Fonts
