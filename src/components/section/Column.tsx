import Components from 'components'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import backgroundPropertyHelper from '../../utils/backgroundPropertyHelper'
import SectionWithBackground from './SectionWithBackground'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { ColumnStoryblok } from '../../typings/generated/components-schema'

const Column: FunctionComponent<{ content: ColumnStoryblok }> = ({ content }) => {
  const containerProps = backgroundPropertyHelper(content.background || [])
  let styles = {}
  if (containerProps.styles) {
    styles = containerProps.styles
  }

  const widthGeneral = content.width_general || 12
  const widthMobile = content.width_phone || 4
  const widthTablet = content.width_tablet || widthGeneral
  const widthDesktop = content.width_desktop || widthGeneral
  const colClasses = clsx(
    'mdc-layout-grid__cell',
    {
      [`mdc-layout-grid__cell--align-${content.align || ''}`]: !!content.align,
      [`mdc-layout-grid__cell--span-${widthGeneral || ''}`]: !widthDesktop,
      [`mdc-layout-grid__cell--span-${widthMobile || ''}-phone`]: true,
      [`mdc-layout-grid__cell--span-${widthTablet || ''}-tablet`]: true,
      [`mdc-layout-grid__cell--span-${widthDesktop || ''}-desktop`]: true,
      [`mdc-layout-grid__cell--start-${Number(content.start_desktop || '')}-desktop`]: !!content.start_desktop,
      [`mdc-layout-grid__cell--start-${Number(content.start_tablet || '')}-tablet`]: !!content.start_tablet,
      [`mdc-layout-grid__cell--start-${Number(content.start_phone || '')}-phone`]: !!content.start_phone,
      [`mdc-layout-grid__cell--order-${Number(content.order_desktop || '')}-desktop`]: !!content.order_desktop,
      [`mdc-layout-grid__cell--order-${Number(content.order_tablet || '')}-tablet`]: !!content.order_tablet,
      [`mdc-layout-grid__cell--order-${Number(content.order_phone || '')}-phone`]: !!content.order_phone
    },
    containerProps.classNames,
    containerProps.classes
  )
  const body = content.body || []
  if (containerProps.image) {
    return (
      <SbEditable content={content}>
        <>
          <SectionWithBackground style={styles}
                                 isColumn={true}
                                 className={colClasses}
                                 containerProps={containerProps}>
            {body.map((blok) => Components(blok))}
          </SectionWithBackground>
        </>
      </SbEditable>
    )
  }

  return (
    <SbEditable content={content}>
      <div className={colClasses}
           style={styles}>
        {body.map((blok) => Components(blok))}
      </div>
    </SbEditable>
  )
}

export default Column