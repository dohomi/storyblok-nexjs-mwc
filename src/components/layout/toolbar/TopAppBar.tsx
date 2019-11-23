import clsx from 'clsx'
import React, { FunctionComponent } from 'react'
import { GlobalStoryblok } from '../../../typings/generated/components-schema'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Container, { ContainerProps } from '@material-ui/core/Container'
import { CreateCSSProperties } from '@material-ui/core/styles/withStyles'

export type AppHeaderProps = {
  settings: GlobalStoryblok,
  hasFeature?: boolean
  hasRightDrawer?: boolean
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  topAppBar: {
    '& .lm-system-bar': {
      height: '40px',
      transitionDuration: '500ms',
      overflow: 'hidden'
    },
    '& .MuiIconButton-root': {
      color: 'inherit'
    },
    '&.lm-toolbar__unelevated:not(.lm-toolbar__scrolled)': {
      boxShadow: 'none'
    },
    '&.lm-toolbar__text-bold .MuiButton-root': {
      fontWeight: 'bold'
    },
    '&.lm-toolbar__transparent:not(.lm-toolbar__scrolled)': {
      backgroundColor: 'transparent',
      boxShadow: 'none'
    },
    '&.lm-toolbar__scrolled': {
      '& .lm-system-bar': {
        height: 0
      },
      '& .MuiToolbar-root': {
        height: theme.toolbar.height.mobile,
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
          height: theme.toolbar.height.landscape
        },
        [theme.breakpoints.up('sm')]: {
          height: theme.toolbar.height.desktop
        }
      }
    }
  },
  toolbarCustom: (props: AppHeaderProps) => {
    const options: CreateCSSProperties<{}> = {}
    if (props.settings.toolbar_color && props.settings.toolbar_color.rgba) {
      options.backgroundColor = props.settings.toolbar_color.rgba
    }
    const increasedFontSize = props.settings.toolbar_font_size
    if (increasedFontSize) {
      options['& .MuiButton-root'] = {
        fontSize: increasedFontSize as string
      }
    }
    return options
  },
  toolbar: {
    height: theme.toolbar.height.custom ? Number(theme.toolbar.height.custom) : theme.toolbar.height.mobile,
    transitionDuration: '500ms',
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: theme.toolbar.height.custom ? Math.round(theme.toolbar.height.custom * 0.86) : theme.toolbar.height.landscape
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.toolbar.height.custom ? Math.round(theme.toolbar.height.custom * 1.15) : theme.toolbar.height.desktop
    }
  }
}))

const mapToolbarColor = {
  'primary': 'primary',
  'secondary': 'secondary',
  'dark': 'inherit',
  'white': 'inherit'
}

const TopAppBar: FunctionComponent<AppHeaderProps & {
  SystemBar?: React.ReactNode
}> = (props) => {
  const classes = useStyles(props)
  const { settings } = props
  const toolbarConfig = settings.toolbar_config || []
  const scrolled = useScrollTrigger({ disableHysteresis: true })
  const toolbarVariant = settings.toolbar_variant
  let toolbarWidth: ContainerProps['maxWidth'] = false
  if (toolbarConfig.includes('fixed_width')) {
    toolbarWidth = settings.theme_container_width && settings.theme_container_width !== 'none' ? settings.theme_container_width : 'lg'
  }

  const isFixedTop = toolbarConfig.includes('fixed')
  return (
    <>
      <AppBar className={clsx(classes.topAppBar, {
        'lm-toolbar__text-bold': toolbarConfig.includes('text_bold'),
        'lm-toolbar__unelevated': toolbarConfig.includes('unelevated'),
        [`lm-toolbar__${toolbarVariant}`]: toolbarVariant,
        'lm-toolbar__transparent': props.hasFeature,
        'lm-toolbar__scrolled': scrolled,
        [classes.toolbarCustom]: props.settings.toolbar_color && props.settings.toolbar_color.rgba
      })}
              color={mapToolbarColor[toolbarVariant || 'default']}
              position={isFixedTop ? 'fixed' : 'relative'}>
        {props.SystemBar}
        <Container maxWidth={toolbarWidth as ContainerProps['maxWidth']}>
          <Toolbar className={classes.toolbar}>
            {props.children}
          </Toolbar>
        </Container>
      </AppBar>
      {isFixedTop && !props.hasFeature && <Toolbar className={classes.toolbar} />}
    </>
  )
}

export default TopAppBar
