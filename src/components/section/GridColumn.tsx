import React, { FunctionComponent } from 'react'
import { ColumnStoryblok } from '../../typings/generated/components-schema'
import SbEditable from 'storyblok-react'
import BackgroundBox from './BackgroundBox'
import BackgroundImage from './BackgroundImage'
import Components from '@components'
import Grid, { GridProps } from '@material-ui/core/Grid'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'

const xsSpanMap = {
  1: 3,
  2: 6,
  3: 9,
  4: 12
}

const smSpanMap = {
  1: 1,
  2: 2,
  3: 4,
  4: 6,
  5: 7,
  6: 9,
  7: 11,
  8: 12
}

const GridColumn: FunctionComponent<{ content: ColumnStoryblok }> = ({ content }) => {
  // const classes = useStyles(content)
  const background = Array.isArray(content.background) && content.background[0]
  const { isMobileWidth, isTabletWidth } = useWindowDimensions()
  const widthGeneral = Number(content.width_general || 12)
  let span = content.width_desktop || widthGeneral
  let order = content.order_desktop
  // let start = content.start_desktop
  if (isTabletWidth) {
    span = content.width_tablet || widthGeneral
    content.order_tablet && (order = content.order_tablet)
    // content.start_tablet && (start = content.start_tablet)
  } else if (isMobileWidth) {
    span = content.width_phone || 4
    content.order_phone && (order = content.order_phone)
    // content.start_phone && (start = content.start_phone)
  }
  //className={classes.column}
  return (
    <SbEditable content={content}>
      <BackgroundBox skipBgImage={true} background={background}>
        <Grid item
              xs={xsSpanMap[content.width_phone as string] || 12}
              sm={smSpanMap[content.width_tablet as string] || widthGeneral}
              md={Number(span) as GridProps['md']}
              style={{
                // alignSelf: content.align_vertical,
                // justifySelf: content.align_horizontal,
                order: order && Number(order),
                // gridColumnEnd: `span ${span}`,
                // gridColumnStart: start
              }}>
          {background && background.image && <BackgroundImage content={background} />}
          {content.body && content.body.map((blok) => Components(blok))}
        </Grid>
      </BackgroundBox>
    </SbEditable>
  )
}

export default GridColumn
