import Components from '@components'
import SbEditable from 'storyblok-react'
import * as React from 'react'
import { FunctionComponent, memo } from 'react'
import { GlobalStoryblok } from '../../typings/generated/components-schema'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => createStyles({
  footer: {
    position: 'relative',
    zIndex: theme.zIndex.drawer + 1
  }
}))

const Footer: FunctionComponent<{ settings: GlobalStoryblok }> = ({ settings }) => {
  const content = settings && settings.footer || []
  const classes = useStyles()
  console.log('footer render')
  return (
    <SbEditable content={settings}>
      <footer className={classes.footer}>
        {content.map((blok) => Components(blok))}
      </footer>
    </SbEditable>
  )
}

export default memo(Footer)
