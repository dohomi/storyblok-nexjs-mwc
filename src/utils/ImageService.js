import DeviceDetectService from './DeviceDetectService'

export function getImageSource ({image, width, height, focalPoint}) {
  let path = ''
  let focal = ''
  if (width && height) {
    path = `${parseInt(width)}x${parseInt(height)}`
  }
  if (!focalPoint) {
    path += '/smart'
  } else {
    focal = getFocalPoint(image, focalPoint)
  }
  return imageService(image, path, focal)
}

export function getPreviewImageSource (image) {
  const orig = getOriginalImageDimensions(image)
  return getImageSource({
    image: image,
    width: orig.width / 100,
    height: orig.height / 100
  })
}

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
export function getOriginalImageDimensions (src) {
  const splitted = src.split('/')
  const originalDimension = src.split('/')[splitted.length - 3].split('x')
  return {
    width: parseInt(originalDimension[0]),
    height: parseInt(originalDimension[1])
  }
}

/**
 *
 * @param originalSource
 * @param width
 * @param height
 * @param filter
 * @param fitInColor
 * @param smart
 * @param focalPoint
 * @return {{src: string,srcSet:string}}
 */
export function getImageAttrs ({originalSource, width, height, filter = '', fitInColor, smart, focalPoint}) {
  const originalDimensions = getOriginalImageDimensions(originalSource)
  if (originalDimensions.width < width) {
    width = originalDimensions.width
  }
  if (originalDimensions.height < height) {
    height = originalDimensions.height
  }
  let path = `${width || 0}x${height || 0}`
  if (fitInColor) {
    path = 'fit-in/' + path
    filter += `:fill(${fitInColor})`
  } else if (smart && !focalPoint) {
    path += '/smart'
  }
  if (focalPoint) {
    filter += getFocalPoint(originalSource, focalPoint)
  }
  const imgObj = {
    src: imageService(originalSource, path, filter)
  }
  // enable retina sourceset
  if (width <= originalDimensions.width / 2 && height <= originalDimensions.height / 2) {
    imgObj.srcSet = `${imgObj.src} 1x, ${imageService(originalSource, `${width * 2}x${height * 2}`, filter)} 2x`
  } else {
    imgObj.srcSet = imgObj.src
  }
  return imgObj
}

/**
 *
 * @param src
 * @param focalPoint
 * @return {string}
 */
export function getFocalPoint (src, focalPoint) {
  const {width, height} = getOriginalImageDimensions(src)
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

  const imageService = 'https://img2.storyblok.com/'
  const path = image.replace('//a.storyblok.com', '')
  return imageService + option + path
}

export default imageService
