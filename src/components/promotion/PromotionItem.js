import SbEditable from 'storyblok-react'
import React, {createRef, useEffect} from 'react'
import Components from 'components/index'
import clsx from 'clsx'


const PromotionItem = (props) => {
  const container = createRef()
  const body = props.body || []
  const action = props.action || []
  const className = clsx('lm-promotion__item', {
    [`lm-promotion__item-${props.variant ? props.variant : 'variant'}`]: true
  })

  useEffect(
    () => {
      const containerHeight = container.current.clientHeight + 1
      const isMobile = props.dimensions.width <= 600
      if (props.position === 'bottom_left_overlap' && isMobile) {
        container.current.style.marginTop = '-25px'
      } else if (props.position === 'bottom_left_overlap') {
        container.current.style.marginTop = `-${containerHeight - 40}px`
      }
    },
    [props.dimensions]
  )

  return (
    <SbEditable content={props}>
      <div className={className} ref={container}>
        <div className="lm-promotion__content">
          {body.map(blok => Components(blok))}
        </div>
        <div className="lm-promotion__action">
          {action.map(blok => Components(blok))}
        </div>
      </div>
    </SbEditable>
  )
}

export default PromotionItem
