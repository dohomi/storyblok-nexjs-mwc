import DeviceDetectService from './DeviceDetectService'

export function imageServiceNoWebp (image, option = '') {
  if (image.endsWith('.svg')) {
    return image
  }
  const imageService = 'https://img2.storyblok.com/'
  const path = image.replace('//a.storyblok.com', '')
  return imageService + option + path
}

/**
 *
 * @param src
 * @return {{width: number, height: number}}
 */
export function getOriginaImageDimensions (src) {
  const splitted = src.split('/')
  const originalDimension = src.split('/')[splitted.length - 3].split('x')
  return {
    width: parseInt(originalDimension[0]),
    height: parseInt(originalDimension[1])
  }
}

/**
 *
 * @param src
 * @param focalPoint
 * @return {string}
 */
export function getFocalPoint (src, focalPoint) {
  const {width, height} = getOriginaImageDimensions(src)
  const focalSplitted = focalPoint.split('x')
  const focalPercentX = parseFloat(focalSplitted[0]) / 100
  const focalPercentY = parseFloat(focalSplitted[1]) / 100
  const topLeft = `${Math.max(0, width * focalPercentX - 50)}x${Math.max(0, height * focalPercentY - 50)}`
  const bottomRight = `${Math.min(width * focalPercentX + 50, width)}x${Math.min(height * focalPercentY + 50, height)}`
  return `:focal(${topLeft}:${bottomRight})`
}

/**
 *
 * @param image
 * @param option
 * @param filter
 * @return {string}
 */
function imageService (image, option = '', filter = '') {
  if (image.endsWith('.svg')) {
    return image
  }
  option && (option += '/')
  const hasWebpSupport = typeof window !== 'undefined' ? window.hasWebpSupport : DeviceDetectService.getWebpSupport()
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
