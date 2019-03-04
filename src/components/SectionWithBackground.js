import clsx from 'clsx'
import imageService from '../utils/ImageService'
import Components from 'components/index'
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

  const sectionClasses = clsx('content-section', {
    'background-section': true,
    'bg-section__repeat': backgroundImageProperty.includes('repeat'),
    'bg-section__contain': backgroundImageProperty.includes('contain')
  })

  return (
    <ContainerDimensions>
      {(context) => (
        <div className={sectionClasses}
             style={{
               'backgroundImage': props.inView ? getBackgroundImageSource({...context, ...props}) : 'none',
               'backgroundPosition': backgroundImagePosition,
               'padding': props.padding || '2.5rem 0'
             }}>
          {props.body.map((blok) => Components(blok))}
        </div>
      )}
    </ContainerDimensions>

  )
}

export default WithBackgroundImage
