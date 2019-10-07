import imageService from './ImageService'
import { Background } from '../typings/generated/components-schema'

type BackgroundStyles = {
  border: string
  backgroundColor?: string
  borderRadius?: string
}

type BackgroundProperty = {
  image: string
  styles: BackgroundStyles
  classNames: string[]
  classes: string[]
  imageProperties: any[]
}

function multipleBackgroundComposer(backgroundElements) {
  const elements = backgroundElements.map(item => {
    const url = imageService(item.url, '')
    return {
      background: `url('${url}') ${item.horizontal || 'left'} ${item.vertical || 'top'} ${item.repeat || 'no-repeat'}`,
      backgroundSize: item.size || 'auto'
    }
  })
  return {
    background: elements.map(i => i.background).join(','),
    backgroundSize: elements.map(i => i.backgroundSize).join(',')
  }
}

function backgroundPropertyHelper(properties) {
  if (!Array.isArray(properties)) {
    return {}
  }
  const values: Background = properties[0] || {} as Background
  if (Object.keys(values).length === 0) {
    return {}
  }
  const borderColor = values.border_color && values.border_color.rgba
  const borderRadius = values.border_radius
  let border = null
  if (borderColor) {
    border = `${values.border_size || 1}px ${values.border_style || 'solid'} ${borderColor}`
  } else if (borderRadius) {
    border = '1px solid transparent'
  }
  const styles: BackgroundStyles = {
    border
  }
  if (borderRadius) {
    styles.borderRadius = borderRadius
  }
  if (values.background_color) {
    styles.backgroundColor = values.background_color.rgba
  }
  if (values.background_elements && values.background_elements.length) {
    Object.assign(styles, multipleBackgroundComposer(values.background_elements))
  }

  return {
    image: values.image,
    styles,
    classNames: values.classNames && values.classNames.values,
    classes: {
      [`mdc-elevation--z${values.elevation}`]: !!values.elevation
    },
    imageProperties: values.property || [],
    focalPoint: values.image_focal_point
  }
}


export default backgroundPropertyHelper
