import React, { FunctionComponent } from 'react'
import { ColumnStoryblok } from '../../typings/generated/components-schema'
import SbEditable from 'storyblok-react'
import BackgroundBox from './BackgroundBox'
import BackgroundImage from './BackgroundImageContainer'
import Components from '@components'
import { createStyles, makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    column: {
      width: 'auto'
    }
  })
)

const GridColumn: FunctionComponent<{ content: ColumnStoryblok }> = ({ content }) => {
  const classes = useStyles(content)
  const background = Array.isArray(content.background) && content.background[0]
  const { isMobile, isTablet } = useWindowDimensions()
  const widthGeneral = content.width_general || 12
  let span = content.width_desktop || widthGeneral
  let order = content.order_desktop
  let start = content.start_desktop
  if (isTablet) {
    span = content.width_tablet || widthGeneral
    content.order_tablet && (order = content.order_tablet)
    content.start_tablet && (start = content.start_tablet)
  } else if (isMobile) {
    span = content.width_phone || 4
    content.order_phone && (order = content.order_phone)
    content.start_phone && (start = content.start_phone)
  }
  return (
    <SbEditable content={content}>
      <BackgroundBox skipBgImage={true} background={background}>
        <div className={classes.column}
             style={{
               gridColumnEnd: `span ${span}`,
               order: order && Number(order),
               gridColumnStart: start
             }}>
          {background && background.image && <BackgroundImage image={background.image} />}
          {content.body && content.body.map((blok) => Components(blok))}
        </div>
      </BackgroundBox>
    </SbEditable>
  )
}

export default GridColumn
