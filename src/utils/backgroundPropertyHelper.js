import imageService from './ImageService'


/**
 * @typedef {Object} BackgroundStyles
 * @property {string} border The image main source
 * @property {string} backgroundColor Computed styles for the div container
 * @property {string} borderRadius Computed class names mainly from bootstrap
 */

/**
 * @typedef {Object} BackgroundProperty
 * @property {string} image The image main source
 * @property {BackgroundStyles} styles Computed styles for the div container
 * @property {array} classNames Computed class names mainly from bootstrap
 * @property {array} classes Computed class names
 * @property {array} imageProperties Image background properties
 */

function multipleBackgroundComposer (backgroundElements) {
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

/**
 *
 * @param properties
 * @return BackgroundProperty
 */
function backgroundPropertyHelper (properties) {
  if (!Array.isArray(properties)) {
    return {}
  }
  const values = properties[0] || {}
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
  const styles = {
    border,
    backgroundColor: values.background_color && values.background_color.rgba,
    borderRadius
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
