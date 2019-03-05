import WebpService from './WebpService'

function imageService (image, option = '') {
  option && (option += '/')
  const hasWebpSupport = typeof window !== 'undefined' ? window.hasWebpSupport : WebpService.getWebpSupport()
  if (hasWebpSupport) {
    option += 'filters:format(webp)'
  }

  const imageService = '//img2.storyblok.com/'
  const path = image.replace('//a.storyblok.com', '')
  let string = imageService + option + path
  console.log(string, option)
  return string
}

export default imageService
