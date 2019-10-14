import DeviceDetectService from './DeviceDetectService'

function _getImageSource({ image, width, height }: { image: string, width: number, height: number }) {
  let path = ''
  if (width && height) {
    path = `${parseInt(String(width))}x${parseInt(String(height))}`
  }
  path += '/smart'
  return imageService(image, path, '')
}


export function getPreviewImageSource(image: string) {
  const orig = getOriginalImageDimensions(image)
  return _getImageSource({
    image: image,
    width: orig.width / 100,
    height: orig.height / 100
  })
}

export function imageServiceNoWebp(image: string, option: string = '') {
  if (image.endsWith('.svg')) {
    return image
  }
  const imageService = 'https://img2.storyblok.com/'
  const path = image.replace('//a.storyblok.com', '')
  return imageService + option + path
}

export function getOriginalImageDimensions(src: string) {
  const splitted = src.split('/')
  const originalDimension = src.split('/')[splitted.length - 3].split('x')
  return {
    width: parseInt(originalDimension[0]),
    height: parseInt(originalDimension[1])
  }
}

type GetImageAttrs = {
  originalSource: string
  width: number
  height?: number
  filter?: string
  fitInColor?: string
  smart?: boolean
  focalPoint?: string
}

export function getImageAttrs({ originalSource, width, height = 0, filter, fitInColor, smart, focalPoint }: GetImageAttrs) {
  const originalDimensions = getOriginalImageDimensions(originalSource)
  if (originalDimensions.width < width) {
    width = originalDimensions.width
  }
  if (height && originalDimensions.height < height) {
    height = originalDimensions.height
  }
  if (fitInColor) {
    filter += `:fill(${fitInColor})`
  }
  let path = getPath(width, height)
  if (focalPoint) {
    filter += getFocalPoint(originalSource, focalPoint)
  }
  const src = imageService(originalSource, path, filter)
  const imgObj = {
    src: src,
    srcSet: src
  }
  // enable retina sourceset
  if (width <= originalDimensions.width / 2 && height <= originalDimensions.height / 2) {
    imgObj.srcSet = `${imgObj.src} 1x, ${imageService(originalSource, getPath(width * 2, height * 2), filter)} 2x`
  }

  function getPath(width: number, height: number) {
    let path = `${width || 0}x${height || 0}`
    if (fitInColor) {
      path = 'fit-in/' + path
    } else if (smart && !focalPoint) {
      path += '/smart'
    }
    return path
  }

  return imgObj
}

export function getFocalPoint(src: string, focalPoint: string) {
  const { width, height } = getOriginalImageDimensions(src)
  const focalSplitted = focalPoint.split('x')
  const focalPercentX = parseFloat(focalSplitted[0]) / 100
  const focalPercentY = parseFloat(focalSplitted[1]) / 100
  const topLeft = `${Math.max(0, width * focalPercentX - 50)}x${Math.max(0, height * focalPercentY - 50)}`
  const bottomRight = `${Math.min(width * focalPercentX + 50, width)}x${Math.min(height * focalPercentY + 50, height)}`
  return `:focal(${topLeft}:${bottomRight})`
}

function imageService(image: string, option: string = '', filter: string = '') {
  if (image.endsWith('.svg')) {
    return image
  }
  option && (option += '/')
  const hasWebpSupport = typeof window !== 'undefined' ? (window as any)['hasWebpSupport'] : DeviceDetectService.getWebpSupport()
  if (hasWebpSupport) {
    option += 'filters:format(webp)' + filter
  } else if (filter) {
    option += 'filters' + filter
  }
  return `https://img2.storyblok.com/${option}${image.split('storyblok.com')[1]}`
}

export default imageService