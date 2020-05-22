import React from 'react'
import { TimelineStoryblok } from '../../typings/generated/components-schema'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { CoreComponentProps } from '../core/CoreComponentProps'

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex'
  }
})

export type LmTimelineProps = CoreComponentProps & { content: TimelineStoryblok }

export function LmTimeline({ content, ComponentRender }: LmTimelineProps): JSX.Element {
  const classes = useStyles()
  const body = content.body || []
  return (
    <div className={'lm-timeline'}>
      <Grid container className={classes.container}>
        {body.map((blok, i) => ComponentRender({ content: blok, iteration: i, key: blok._uid }, i))}
      </Grid>
    </div>
  )
}
