import clsx from 'clsx'
import React, { FunctionComponent } from 'react'
import { GlobalStoryblok } from '../../../typings/generated/components-schema'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

const toolbarHeight = {
  mobile: 56,
  landscape: 48,
  desktop: 64
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  topAppBar: {
    '&.lm-toolbar__scrolled > .MuiToolbar-root': {
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
  toolbar: (props: AppTopAppProps) => {
    return {
      padding: theme.spacing(1),
      height: props.toolbarHeight ? Number(props.toolbarHeight) : toolbarHeight.mobile,
      transitionDuration: '300ms',
      [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
        height: props.toolbarHeight ? Math.round(props.toolbarHeight * 0.86) : toolbarHeight.landscape
      },
      [theme.breakpoints.up('sm')]: {
        height: props.toolbarHeight ? Math.round(props.toolbarHeight * 1.15) : toolbarHeight.desktop
      }

    }
  }
}))

type AppTopAppProps = {
  transparentToolbar: boolean
  toolbarConfig: GlobalStoryblok['toolbar_config']
  fixed: boolean
  variant: GlobalStoryblok['toolbar_variant']
  toolbarHeight: GlobalStoryblok['toolbar_main_height']
}

const mapToolbarColor = {
  'primary': 'primary',
  'secondary': 'secondary',
  'dark': 'primary',
  'white': 'inherit'
}

// function getClassName(props: AppTopAppProps, pos = 0) {
//   const toolbarConfig = props.toolbarConfig || []
//   return clsx('lm-toolbar', {
//     ['lm-toolbar__bold-text']: toolbarConfig.includes('text_bold'),
//     ['lm-toolbar__fixed-width']: toolbarConfig.includes('fixed_width'),
//     ['lm-toolbar-transparent']: props.transparentToolbar && pos < 128
//   })
// }

// const TopAppBarWrap: FunctionComponent<AppTopAppProps> = (props) => {
//   const dimensions = useWindowDimensions()
//   const { asPath } = useRouter()
//   let scrollPos = scrollPositionHook()
//   let [className, setClassName] = useState(getClassName(props)) // because of server/client hydration
//
//   // let className = getClassName()
//   useEffect(() => {
//       setClassName(getClassName(props, scrollPos)) // todo is this necessary? maybe different approach
//     },
//     [scrollPos, props.transparentToolbar, dimensions, asPath]
//   )
//
//   return (
//     <AppBar className={className}
//             color={mapToolbarColor[props.variant || 'default']}
//             position={props.fixed ? 'fixed' : 'relative'}>
//       <Toolbar>
//         {props.children}
//       </Toolbar>
//     </AppBar>
//   )
// }

const TopAppBar: FunctionComponent<AppTopAppProps> = (props) => {
  const classes = useStyles(props)
  const toolbarConfig = props.toolbarConfig || []
  const scrolled = useScrollTrigger({ disableHysteresis: true })
  return (
    <>
      <AppBar className={clsx(classes.topAppBar, {
        ['lm-toolbar__bold-text']: toolbarConfig.includes('text_bold'),
        ['lm-toolbar__fixed-width']: toolbarConfig.includes('fixed_width'),
        [`lm-toolbar__${props.variant}`]: props.variant,
        'lm-toolbar__transparent': props.transparentToolbar,
        'lm-toolbar__scrolled': scrolled
      })}
              color={mapToolbarColor[props.variant || 'default']}
              position={props.fixed ? 'fixed' : 'relative'}>
        <Toolbar className={classes.toolbar}>
          {props.children}
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.toolbar} />
    </>
  )
}

export default TopAppBar
