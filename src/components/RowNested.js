import Components from 'components/index'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'

const MatRow = (props) => {
  const content = props.content
  const classes = clsx(
    'mdc-layout-grid__inner',
    content.style,
    content.style_props, content.class_names && content.class_names.values)
  const styles = {}
  if (content.background_color) {
    styles.backgroundColor = content.background_color
  }
  return (
    <SbEditable content={content}>
      <div className={classes}
           style={styles}>
        {content.body.map((blok) => Components(blok))}
      </div>
    </SbEditable>
  )
}

export default MatRow
