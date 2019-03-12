import Components from 'components/index'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'

const MatRow = (props) => {
  const content = props.content
  const gridClasses = clsx(
    'mdc-layout-grid',
    {
      [`mdc-layout-grid__cell--align-${content.align || ''}`]: content.align !== undefined,
      'mdc-layout-grid--fixed-column-width': !content.fluid_width
    },
    content.style,
    content.style_props,
    content.class_names && content.class_names.values)
  const styles = {}
  if (content.background_color) {
    styles.backgroundColor = content.background_color
  }
  const innerStyles = {}
  content.grid_gap && (innerStyles.columnGap = `${content.grid_gap}px`)
  return (
    <SbEditable content={content}>
      <div className={gridClasses}
           style={styles}>
        <div className="mdc-layout-grid__inner" style={innerStyles}>
          {content.body.map((blok) =>
            Components(blok)
          )}
        </div>
      </div>
    </SbEditable>
  )
}
export default MatRow
