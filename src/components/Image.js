import SbEditable from 'storyblok-react'
import imageService from '../utils/ImageService'
import clsx from 'clsx'
import ContainerDimensions from 'react-container-dimensions'
import VisibilityContext from '../utils/VisibilityContext'


/**
 *
 * @param componentProps
 * @param ctx
 * @return {*}
 */
const getSource = (componentProps, ctx = {}) => {
  const inView = componentProps.inView
  if (!inView) {
    return 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
  }
  const property = componentProps.content.property || []
  const widthProp = componentProps.content.width
  const heightProp = componentProps.content.height

  const availableWidth = widthProp || (ctx.width)
  const availableHeight = heightProp || 0
  let path = `${availableWidth || 0}x${availableHeight || 0}`
  if (property.includes('rounded-circle') || property.includes('square')) {
    // overwrite if square
    const iconSize = availableHeight || availableWidth || '64'
    path = `${iconSize}x${iconSize}`
  }


  return imageService(componentProps.content.source, path)
}

const Image = (props) => {
  const componentProps = props
  const imgClasses = clsx(componentProps.content.property)
  return (
    <SbEditable content={componentProps.content}>
      <VisibilityContext.Consumer>
        {(inView) => (
          <div className={`w-100`}>
            {
              componentProps.content.width || componentProps.content.height ? (
                <img src={getSource({...componentProps, inView})} alt={componentProps.content.alt || 'image'}
                     className={imgClasses}/>
              ) : (
                <ContainerDimensions>
                  {(context) => <img src={getSource({...componentProps, inView}, context)}
                                     alt={componentProps.content.alt}
                                     className={imgClasses}/>}
                </ContainerDimensions>
              )
            }
          </div>
        )
        }
      </VisibilityContext.Consumer>
    </SbEditable>
  )
}

export default Image
