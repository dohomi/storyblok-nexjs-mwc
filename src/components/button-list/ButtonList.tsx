import SbEditable from 'storyblok-react'
import Components from 'components'
import clsx from 'clsx'
import { FunctionComponent } from 'react'
import { ButtonListStoryblok } from '../../typings/generated/components-schema'


const ButtonList: FunctionComponent<{ content: ButtonListStoryblok }> = ({ content }) => {
  const body = content.body || []
  const properties = content.property || []
  const classNames = clsx('d-flex', content.class_names && content.class_names.values, {
    'lm-button-list__margin-left': !!properties.includes('margin_left')
  })

  return (
    <SbEditable content={content}>
      <div className={classNames}>
        {body.map(i => Components(i))}
      </div>
    </SbEditable>
  )
}

export default ButtonList
