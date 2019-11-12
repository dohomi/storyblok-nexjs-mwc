import clsx from 'clsx'
import React, { FunctionComponent } from 'react'
import { GlobalStoryblok } from '../../../typings/generated/components-schema'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { Container } from '@material-ui/core'
import { ContainerProps } from '@material-ui/core/Container'

export type AppHeaderProps = {
  settings: GlobalStoryblok,
  hasFeature?: boolean
  hasRightDrawer?: boolean
}

const toolbarHeight = {
  mobile: 56,
  landscape: 48,
  desktop: 64
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  topAppBar: {
    '&.lm-toolbar__scrolled .MuiToolbar-root': {
      height: toolbarHeight.mobile,
      [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
        height: toolbarHeight.landscape
      },
      [theme.breakpoints.up('sm')]: {
        height: toolbarHeight.desktop
      }
    },
    [theme.breakpoints.up('sm')]: {
      '& .sm-inline-flex': {
        display: 'inline-flex'
      },
      '& .sm-none': {
        display: 'none'
      }
    },
    [theme.breakpoints.up('md')]: {
      '& .md-inline-flex': {
        display: 'inline-flex'
      },
      '& .md-none': {
        display: 'none'
      }
    },
    [theme.breakpoints.up('lg')]: {
      '& .lg-inline-flex': {
        display: 'inline-flex'
      },
      '& .lg-none': {
        display: 'none'
      }
    }
  },
  toolbar: (props: AppHeaderProps) => {
    const toolbarMainHeight = props.settings.toolbar_main_height
    return {
      padding: theme.spacing(1),
      height: toolbarMainHeight ? Number(toolbarMainHeight) : toolbarHeight.mobile,
      transitionDuration: '500ms',
      [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
        height: toolbarMainHeight ? Math.round(toolbarMainHeight * 0.86) : toolbarHeight.landscape
      },
      [theme.breakpoints.up('sm')]: {
        height: toolbarMainHeight ? Math.round(toolbarMainHeight * 1.15) : toolbarHeight.desktop
      }

    }
  }
}))

const mapToolbarColor = {
  'primary': 'primary',
  'secondary': 'secondary',
  'dark': 'primary',
  'white': 'inherit'
}

const TopAppBar: FunctionComponent<AppHeaderProps> = (props) => {
  const classes = useStyles(props)
  const { settings } = props
  const toolbarConfig = settings.toolbar_config || []
  const scrolled = useScrollTrigger({ disableHysteresis: true })
  const toolbarVariant = settings.toolbar_variant
  let toolbarWidth: ContainerProps['maxWidth'] = false
  if (toolbarConfig.includes('fixed_width')) {
    toolbarWidth = settings.theme_container_width && settings.theme_container_width !== 'none' ? settings.theme_container_width : 'lg'
  }
  return (
    <>
      <AppBar className={clsx(classes.topAppBar, {
        ['lm-toolbar__bold-text']: toolbarConfig.includes('text_bold'),
        [`lm-toolbar__${toolbarVariant}`]: toolbarVariant,
        'lm-toolbar__transparent': props.hasFeature,
        'lm-toolbar__scrolled': scrolled
      })}
              color={mapToolbarColor[toolbarVariant || 'default']}
              position={toolbarConfig.includes('fixed') ? 'fixed' : 'relative'}>
        <Container maxWidth={toolbarWidth as ContainerProps['maxWidth']}>
          <Toolbar className={classes.toolbar}>
            {props.children}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar className={classes.toolbar} />
    </>
  )
}

export default TopAppBar
