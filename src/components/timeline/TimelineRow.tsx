import React, { FunctionComponent } from 'react'
import { TimelineItemStoryblok } from '../../typings/generated/components-schema'
import SbEditable from 'storyblok-react'
import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TimelineRowItem from './TimelineRowItem'
import LmAvatar from '../avatar/LmAvatar'

const useStyles = makeStyles((theme: Theme) => createStyles({
  iconGrid: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    position: 'absolute',
    left: 'calc(50% - 1px)',
    width: '2px',
    height: '100%',
    backgroundColor: theme.palette.grey.A100
  },
  iconContainer: {
    zIndex: 0,
    margin: '0 !important'
  }
}))

const TimelineRow: FunctionComponent<{
  content: TimelineItemStoryblok,
  iteration: number
}> = ({ content, iteration }) => {
  const classes = useStyles()

  return (
    <SbEditable content={content}>
      <Grid item xs={5}>
        {iteration % 2 === 0 && <TimelineRowItem isLeft={true} content={content} />}
      </Grid>
      <Grid item xs={2} className={classes.iconGrid}>
        <div className={classes.line} />
        <div className={classes.iconContainer}>
          {content.icon && content.icon.map(blok => <LmAvatar content={blok} key={blok._uid} />)}
        </div>
      </Grid>
      <Grid item xs={5}>
        {iteration % 2 !== 0 && <TimelineRowItem isLeft={false} content={content} />}
      </Grid>
    </SbEditable>
  )
}

export default TimelineRow
