// @ts-ignore
import FontFaceObserver from 'fontfaceobserver/fontfaceobserver.standalone.js'
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

  const mdi = document.createElement('link')
  mdi.href = `https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/4.4.95/css/materialdesignicons.min.css`
  mdi.rel = 'stylesheet'
  document.head.appendChild(mdi)
  const mdiFont = {
    mdi: new FontFaceObserver('Material Design Icons', {
      weight: 400
    })
  }
  console.log('inside of fonts1')
  mdiFont.mdi.load()
    .then(() => {
      document.documentElement.classList.add('mdi-loaded')
    })
    .catch((e: any) => {
      console.error(e)
    })

  // currently only watch on icons
  fonts.material.load().then(() => {
    document.documentElement.classList.add('fonts-loaded')
  }).catch((e: Error) => {
    console.error('ERROR:  ', e)
    document.documentElement.classList.add('fonts-loaded')
  })
  // fonts.nunito.load()
}
export default fontHandler
