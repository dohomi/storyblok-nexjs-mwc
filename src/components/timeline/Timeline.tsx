import React from 'react'
import { TimelineStoryblok } from '../../typings/generated/components-schema'
import SbEditable from 'storyblok-react'
import TimelineRow from './TimelineRow'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex'
  }
})

export type LmTimelineProps = { content: TimelineStoryblok }

export function LmTimeline({ content }: LmTimelineProps): JSX.Element {
  const classes = useStyles()
  const body = content.body || []
  return (
    <SbEditable content={content}>
      <div className={'lm-timeline'}>
        <Grid container className={classes.container}>
          {body.map((blok, i) => <TimelineRow content={blok} iteration={i} key={blok._uid} />)}
        </Grid>
      </div>
    </SbEditable>
  )
}
