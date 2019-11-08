import FontFaceObserver from 'fontfaceobserver'
import { GlobalStoryblok } from '../src/typings/generated/components-schema'

const fontHandler = (settings: Partial<GlobalStoryblok>) => {
  const settingsFonts = ['theme_font_default', 'theme_font_alt1', 'theme_font_alt2', 'theme_font_alt3', 'theme_font_alt4']
  const loadFonts = ['Material+Icons']
  Object.keys(settings).forEach(key => {
    if (settingsFonts.includes(key) && settings[key]) {
      loadFonts.push(settings[key])
    }
  })

  const link = document.createElement('link')
  link.href = `https://fonts.googleapis.com/css?family=${loadFonts.join('|')}`
  link.rel = 'stylesheet'
  document.head.appendChild(link)
  const fonts = {
    material: new FontFaceObserver('Material Icons', {
      weight: 400
    })
  }
  // currently only watch on icons
  Promise.all([
    fonts.material.load()
    // fonts.nunito.load()
  ]).then(() => {
    document.documentElement.classList.add('fonts-loaded')
  }).catch(e => {
    console.error(e)
    document.documentElement.classList.add('fonts-failed')
  })
}
export default fontHandler
