import WebpService from './WebpService'

export function imageServiceNoWebp(image, option = '', filter = ''){
  option && (option += '/')
  if (filter) {
    option += 'filters' + filter
  }
  const imageService = '//img2.storyblok.com/'
  const path = image.replace('//a.storyblok.com', '')
  return imageService + option + path
}

function imageService (image, option = '', filter = '') {
  option && (option += '/')
  const hasWebpSupport = typeof window !== 'undefined' ? window.hasWebpSupport : WebpService.getWebpSupport()
  if (hasWebpSupport) {
    option += 'filters:format(webp)' + filter
  } else if (filter) {
    option += 'filters' + filter
  }

  const imageService = '//img2.storyblok.com/'
  const path = image.replace('//a.storyblok.com', '')
  return imageService + option + path
}

export default imageService
