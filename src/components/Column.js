import Components from 'components/index'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'

const Column = (props) => {
  // const width = props.content && props.content.width || {}
  const content = props.content
  const styles = {}
  if (content.background_color) {
    styles.backgroundColor = content.background_color
  }

  const widthGeneral = content.width_general || 12
  const widthMobile = content.width_mobile || widthGeneral
  const widthTablet = content.width_tablet || widthGeneral
  const widthDesktop = content.width_desktop || widthGeneral
  const colClasses = clsx(
    'mdc-layout-grid__cell',
    {
      [`mdc-layout-grid__cell--order-${content.order || ''}`]: content.order !== undefined,
      [`mdc-layout-grid__cell--align-${content.align || ''}`]: content.align !== undefined,
      [`mdc-layout-grid__cell--span-${widthGeneral || ''}`]: true,
      [`mdc-layout-grid__cell--span-${widthMobile || ''}-phone`]: true,
      [`mdc-layout-grid__cell--span-${widthTablet || ''}-tablet`]: true,
      [`mdc-layout-grid__cell--span-${widthDesktop || ''}-desktop`]: true,
      [`mdc-layout-grid__cell--start-${Number(content.start_desktop || '')}-desktop`]: content.start_desktop !== undefined,
      [`mdc-layout-grid__cell--start-${Number(content.start_tablet || '')}-tablet`]: content.start_tablet !== undefined,
      [`mdc-layout-grid__cell--start-${Number(content.start_phone || '')}-phone`]: content.start_phone !== undefined
    },
    content.style,
    content.style_props,
    content.class_names && content.class_names.values)
  return (
    <SbEditable content={props.content}>
      <div className={colClasses}
           style={styles}>
        {props.content.body.map((blok) => Components(blok))}
      </div>
    </SbEditable>
  )
}

export default Column
