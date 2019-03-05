import clsx from 'clsx'
import imageService from '../utils/ImageService'
import ContainerDimensions from 'react-container-dimensions'


const getBackgroundImageSource = (context) => {
  const backgroundImage = context.background_image
  const backgroundImageProperty = context.background_image_property || []
  let path = ''
  if (!backgroundImageProperty.includes('contain')) {
    path = `${parseInt(context.width)}x${parseInt(context.height)}`
    if (backgroundImageProperty.includes('crop')) {
      path += '/smart'
    }
  }
  console.log(path)
  const src = imageService(backgroundImage, path)
  if (context.inView) {
    return `url('${src}')`
  } else {
    return 'none'
  }
}

const WithBackgroundImage = (props) => {

  const backgroundImagePosition = props.background_image_position || 'center'
  const backgroundImageProperty = props.background_image_property || []

  const sectionClasses = clsx(props.classNames, {
    'lm-background-section': true,
    'lm-bg-section__repeat': backgroundImageProperty.includes('repeat'),
    'lm-bg-section__contain': backgroundImageProperty.includes('contain')
  })

  return (
    <ContainerDimensions>
      {(context) => (
        <div className={sectionClasses}
             style={{
               'backgroundImage': props.inView ? getBackgroundImageSource({...context, ...props}) : 'none',
               'backgroundPosition': backgroundImagePosition,
               'padding': !props.isFullHeight && props.padding || '2.5rem 0'
             }}>
          {props.children}
        </div>
      )}
    </ContainerDimensions>
  )
}

export default WithBackgroundImage
