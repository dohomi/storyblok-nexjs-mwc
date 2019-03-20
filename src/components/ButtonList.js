import SbEditable from 'storyblok-react'
import Components from 'components/index'
import clsx from 'clsx'
import {memo} from 'react'


const ButtonList = ({content}) => {
  const body = content.body || []
  const properties = content.property || []
  const classNames = clsx('d-flex', {
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

export default memo(ButtonList)
