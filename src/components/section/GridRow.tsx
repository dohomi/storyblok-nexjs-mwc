import * as React from 'react'
import { FunctionComponent } from 'react'
import { RowStoryblok } from '../../typings/generated/components-schema'
import SbEditable from 'storyblok-react'
import Grid, { GridProps } from '@material-ui/core/Grid'
import { createStyles, makeStyles } from '@material-ui/styles'
import Components from '@components'
import BackgroundBox from './BackgroundBox'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'

const useStyles = makeStyles(() =>
  createStyles({
    gridRow: {
      height: '100%'
    }
  })
)

const GridRow: FunctionComponent<{ content: RowStoryblok }> = ({ content }) => {
  // const theme = useTheme()
  const classes = useStyles()
  const { isMobileWidth, isTabletWidth } = useWindowDimensions()
  let spacing = content.grid_gutter || 3
  if (isTabletWidth) {
    spacing = content.grid_gutter_phone || spacing
  } else if (isMobileWidth) {
    spacing = content.grid_gutter_tablet || spacing
  } else {
    spacing = content.grid_gutter_desktop || spacing
  }

  return (
    <SbEditable content={content}>
      <BackgroundBox background={Array.isArray(content.background) && content.background[0]}>
        <Grid container
              style={{
                padding: (spacing * 8) + 'px'
              }}
              spacing={spacing as GridProps['spacing']}
              className={classes.gridRow}
              justify={content.justify}
              alignContent={content.content_align}>
          {content.body && content.body.map((blok) => Components(blok))}
        </Grid>
      </BackgroundBox>
    </SbEditable>
  )
}

export default GridRow
