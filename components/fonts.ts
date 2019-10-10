import FontFaceObserver from 'fontfaceobserver'
import { GlobalStoryblok } from '../src/typings/generated/components-schema'

const fontHandler = (settings: GlobalStoryblok) => {
  const settingsFonts = ['theme_font_default', 'theme_font_alt1', 'theme_font_alt2', 'theme_font_alt3', 'theme_font_alt4']
  const loadFonts = ['Material+Icons']
  Object.keys(settings).forEach(key => {
    if (settingsFonts.includes(key) && settings[key]) {
      loadFonts.push(settings[key])
    }
  })
  if (!settings.theme_font_default) {
    loadFonts.push('Nunito:300,400,700')
  }
  const link = document.createElement('link')
  link.href = `https://fonts.googleapis.com/css?family=${loadFonts.join('|')}`
  link.rel = 'stylesheet'
  document.head.appendChild(link)

  //https://fonts.googleapis.com/css?family=Nunito:300,400,700|Material+Icons
  const fonts = {
    material: new FontFaceObserver('Material Icons', {
      weight: 400
    })
    // nunito: new FontFaceObserver('Nunito', {
    //   weight: 400
    // })
  }
  // currently only watch on icons
  Promise.all([
    fonts.material.load()
    // fonts.nunito.load()
  ]).then(() => {
    document.documentElement.classList.add('fonts-loaded')
  }).catch(e => {
    document.documentElement.classList.add('fonts-failed')
  })
}
export default fontHandler
