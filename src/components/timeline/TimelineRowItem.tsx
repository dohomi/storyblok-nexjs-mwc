import React, { FunctionComponent } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import { TimelineItemStoryblok } from '../../typings/generated/components-schema'
import Components from '@components'

const useStyles = makeStyles((theme: Theme) => createStyles({
  cardContainer: {
    position: 'relative'
  },
  cardDecoratorLeft: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderTop: '16px solid transparent',
    borderLeft: '16px solid' + theme.palette.grey.A100,
    borderBottom: '16px solid transparent',
    top: 'calc(50% - 16px)',
    left: '100%'
  },
  cardDecoratorRight: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderTop: '16px solid transparent',
    borderRight: '16px solid' + theme.palette.grey.A100,
    borderBottom: '16px solid transparent',
    top: 'calc(50% - 16px)',
    right: '100%'
  }
}))

const TimelineRowItem: FunctionComponent<{
  isLeft: boolean
  content: TimelineItemStoryblok
}> = ({ isLeft, content }) => {
  const classes = useStyles()
  const body = content.body || []
  return (
    <div className={classes.cardContainer}>
      <div className={isLeft ?
        classes.cardDecoratorLeft : classes.cardDecoratorRight} />
      <Card>
        {(content.title || content.subheader) && <CardHeader title={content.title} subheader={content.subheader} />}
        {body.length > 0 && <CardContent>{body.map(blok => Components(blok))}</CardContent>}
      </Card>
    </div>
  )
}

export default TimelineRowItem
