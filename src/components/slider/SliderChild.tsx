import React, { FunctionComponent } from 'react'
import { SectionProps } from '../section/Section'
import Components from '@components'

const SliderChild: FunctionComponent<{ body: any[], sectionVariant: any }> = ({ body, sectionVariant }) => {
  return (
    <div className="d-flex h-100 lm-slider__container flex-row justify-content-center">
      {body.map(item => {
        if (item.component === 'section') {
          let newOpts: SectionProps = {
            ...item,
            presetVariant: sectionVariant || 'transparent'
          }
          return Components(newOpts)
        }
        return <div key={`child_${item._uid}`} className="flex-grow-1">{Components(item)}</div>
      })}
    </div>
  )
}

export default SliderChild
