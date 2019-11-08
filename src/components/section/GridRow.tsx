import * as React from 'react'
import { FunctionComponent } from 'react'
import { RowStoryblok } from '../../typings/generated/components-schema'
import SbEditable from 'storyblok-react'
import Grid, { GridProps } from '@material-ui/core/Grid'
import { createStyles, makeStyles } from '@material-ui/styles'
import Components from '@components'
import BackgroundBox, { BackgroundBoxProps } from './BackgroundBox'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import clsx from 'clsx'
import BackgroundImage from './BackgroundImage'

const useStyles = makeStyles(() =>
  createStyles({
    gridRow: {
      height: '100%',
      minHeight: 'inherit'
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
  const background = Array.isArray(content.background) && content.background[0]
  return (
    <SbEditable content={content}>
      <BackgroundBox background={background}>
        {({ style, className }: BackgroundBoxProps) => (
          <Grid container
                style={{
                  ...style,
                  padding: (spacing * 8) + 'px'
                }}
                spacing={spacing as GridProps['spacing']}
                className={clsx(className, classes.gridRow)}
                justify={content.justify ? content.justify : undefined}
                alignContent={content.align_content ? content.align_content : undefined}>
            {background && background.image &&
            <BackgroundImage content={background} backgroundStyle={content.background_style} />}
            {content.body && content.body.map((blok) => Components(blok))}
          </Grid>
        )}
      </BackgroundBox>
    </SbEditable>
  )
}

export default GridRow
