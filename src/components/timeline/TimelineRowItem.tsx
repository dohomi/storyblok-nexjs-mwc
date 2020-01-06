import React, { FunctionComponent } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import { TimelineItemStoryblok } from '../../typings/generated/components-schema'
import Components from '@components'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => createStyles({
  cardContainer: {
    position: 'relative'
  },
  cardDecorator: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderTop: '16px solid transparent',
    borderBottom: '16px solid transparent',
    top: 'calc(50% - 16px)'
  },
  cardDecoratorLeft: {
    left: '100%',
    borderLeft: '16px solid' + theme.palette.grey.A100
  },
  cardDecoratorRight: {
    borderRight: '16px solid' + theme.palette.grey.A100,
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
      <div className={clsx(classes.cardDecorator, isLeft ? classes.cardDecoratorLeft : classes.cardDecoratorRight)} />
      <Card>
        {(content.title || content.subheader) && <CardHeader title={content.title} subheader={content.subheader} />}
        {body.length > 0 && <CardContent>{body.map(blok => Components(blok))}</CardContent>}
      </Card>
    </div>
  )
}

export default TimelineRowItem
