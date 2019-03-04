import Components from 'components/index'
import SbEditable from 'storyblok-react'
import {GridInner} from '@rmwc/grid'
import clsx from 'clsx'

const MatRow = (props) => {
  const content = props.content
  const classes = clsx(content.style, content.style_props)
  const styles = {}
  if (content.background_color) {
    styles.backgroundColor = content.background_color
  }
  return (
    <SbEditable content={content}>
      <GridInner className={classes}
                 style={styles}>
        {content.body.map((blok) =>
          Components(blok)
        )}
      </GridInner>
    </SbEditable>
  )
}

export default MatRow
