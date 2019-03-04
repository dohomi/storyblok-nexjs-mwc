import Components from 'components/index'
import SbEditable from 'storyblok-react'
import {Grid, GridInner} from '@rmwc/grid'
import clsx from 'clsx'

const MatRow = (props) => {

  const content = props.content
  const classes = clsx(content.style)
  const classesInner = clsx(content.style_inner)
  const styles = {}
  if (content.max_width) {
    styles.maxWidth = content.max_width
    styles.margin = '0 auto'
  }
  if (content.background_color) {
    styles.backgroundColor = content.background_color
  }
  return (
    <SbEditable content={content}>
      <Grid className={classes}
            align={content.align}
            style={styles}
            fixedColumnWidth={!content.fluid_width}>
        <GridInner className={classesInner}>
          {content.body.map((blok) =>
            Components(blok)
          )}
        </GridInner>
      </Grid>
    </SbEditable>
  )
}
export default MatRow
