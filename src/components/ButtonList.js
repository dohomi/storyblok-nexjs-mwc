import SbEditable from 'storyblok-react'
import Components from 'components/index'


const ButtonList = ({content}) => {
  const body = content.body || []
  return (
    <SbEditable content={content}>
      <div>
        {body.map(i => Components(i))}
      </div>
    </SbEditable>
  )
}

export default ButtonList
