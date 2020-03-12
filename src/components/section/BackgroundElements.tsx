import React, { FunctionComponent } from 'react'
import {
  BackgroundElementColorStoryblok,
  BackgroundElementItemStoryblok
} from '../../typings/generated/components-schema'
import imageService from '../../utils/ImageService'

function multipleBackgroundComposer(backgroundElements?: (BackgroundElementColorStoryblok | BackgroundElementItemStoryblok)[]) {
  if (!Array.isArray(backgroundElements)) {
    return {}
  }
  const elements = backgroundElements.map(item => {
    const elementType = item.component
    switch (elementType) {
      case 'background_element_item': {
        const url = imageService(item.url || '', '')
        return {
          background: `url('${url}') ${item.horizontal || 'left'} ${item.vertical || 'top'} ${item.repeat || 'no-repeat'}`,
          backgroundSize: item.size || 'auto'
        }
      }
      case 'background_element_color': {
        return {
          background: item.color && item.color.rgba,
          backgroundSize: item.size || 'auto'
        }
      }
    }

  })
  return {
    background: elements.map(i => i.background).join(','),
    backgroundSize: elements.map(i => i.backgroundSize).join(',')
  }
}


const BackgroundElements: FunctionComponent<{

  elements: (BackgroundElementColorStoryblok | BackgroundElementItemStoryblok)[]
}> = ({ elements = [] }) => {

  if (!elements.length) {
    return null
  }
  const styleElement = multipleBackgroundComposer(elements)
  console.log(elements, styleElement)
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      ...styleElement
    }} />
  )
}
export default BackgroundElements
