import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useGlobalStyles = makeStyles((theme: Theme) => {

  const spacing = {}
  const directions = [{ key: 't', val: 'Top' }, { key: 'l', val: 'Left' }, { key: 'r', val: 'Right' }, {
    key: 'b',
    val: 'Bottom'
  }]
  for (let i = 0; i <= 5; i++) {
    for (const dir of directions) {
      spacing[`.p${dir.key}-${i}`] = {
        [`padding${dir.val}`]: theme.spacing(i)
      }
      spacing[`.m${dir.key}-${i}`] = {
        [`margin${dir.val}`]: theme.spacing(i)
      }
      spacing[`.p-${i}`] = {
        [`padding`]: theme.spacing(i)
      }
      spacing[`.m-${i}`] = {
        [`margin`]: theme.spacing(i)
      }
      spacing[`.mx-${i}`] = {
        [`marginLeft`]: theme.spacing(i),
        [`marginRight`]: theme.spacing(i)
      }
      spacing[`.my-${i}`] = {
        [`marginTop`]: theme.spacing(i),
        [`marginBottom`]: theme.spacing(i)
      }
      spacing[`.px-${i}`] = {
        [`paddingLeft`]: theme.spacing(i),
        [`paddingRight`]: theme.spacing(i)
      }
      spacing[`.py-${i}`] = {
        [`paddingTop`]: theme.spacing(i),
        [`paddingBottom`]: theme.spacing(i)
      }
    }
  }
  return createStyles({
    '@global': {
      ...spacing,
      'a':{
        textDecoration: 'none',

      },
      '.badge, .badge-pill': {
        display: 'inline-block',
        padding: '.25em .4em',
        backgroundColor: theme.palette.type === 'dark' ? '#f5f5f5' : 'rgb(66,66,66)',
        color: theme.palette.type === 'dark' ? 'rgba(0, 0, 0, 0.87)' : theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
        transform: '225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
      },
      '.badge-pill': {
        borderRadius: '2rem'
      },
      '.badge-primary': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      },
      '.badge-secondary': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText
      },
      '.badge-danger': {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText
      },
      '.badge-light': {
        backgroundColor: '#f5f5f5',
        color: 'rgba(0, 0, 0, 0.87)'
      },
      '.badge-dark': {
        backgroundColor: 'rgb(66,66,66)',
        color: '#fff'
      },
      '.embed-responsive': {
        position: 'relative',
        display: 'block',
        width: '100%',
        padding: 0,
        overflow: 'hidden',
        '&.embed-responsive-16by9': {
          paddingBottom: '56.25%'
        }
      },
      '.embed-responsive-item': {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 0
      },
      '.material-icons': {
        visibility: 'hidden'
      },
      '.line-through': {
        textDecoration: 'line-through'
      },
      '.fonts-loaded': {
        '& .material-icons': {
          visibility: 'visible'
        }
      },
      '.d-none': {
        display: 'none'
      },
      '.text-left': {
        textAlign: 'left'
      },
      '.text-center': {
        textAlign: 'center'
      },
      '.text-right': {
        textAlign: 'right'
      },
      '.font-weight-bold': {
        fontWeight: 'bold'
      },
      '.text-primary': {
        color: theme.palette.primary.main
      },
      '.text-secondary': {
        color: theme.palette.secondary.main
      },
      '.text-white': {
        color: theme.palette.common.white
      },
      'a.lm-link__button': {
        textDecoration: 'none',
        color: 'inherit'
      },
      '.lm-font-alt1': {
        fontFamily: theme.alternativeFont.alt1 || theme.typography.fontFamily
      },
      '.lm-font-alt2': {
        fontFamily: theme.alternativeFont.alt2 || theme.typography.fontFamily
      },
      '.lm-font-alt3': {
        fontFamily: theme.alternativeFont.alt3 || theme.typography.fontFamily
      },
      '.lm-font-alt4': {
        fontFamily: theme.alternativeFont.alt4 || theme.typography.fontFamily
      },
      // NProgress
      '#nprogress': {
        pointerEvents: 'none',
        '& .bar': {
          position: 'fixed',
          background: theme.palette.primary.main,
          borderRadius: 0,
          zIndex: theme.zIndex.tooltip,
          top: 0,
          left: 0,
          width: '100%',
          height: 2
        },
        '& dd, & dt': {
          position: 'absolute',
          top: 0,
          height: 2,
          boxShadow: `${theme.palette.primary.main} 1px 0 6px 1px`,
          borderRadius: '100%',
          animation: 'nprogress-pulse 2s ease-out 0s infinite'
        },
        '& dd': {
          opacity: 0.6,
          width: 20,
          right: 0,
          clip: 'rect(-6px,22px,14px,10px)'
        },
        '& dt': {
          opacity: 0.6,
          width: 180,
          right: -80,
          clip: 'rect(-6px,90px,14px,-6px)'
        }
      },
      '@keyframes nprogress-pulse': {
        '30%': {
          opacity: 0.6
        },
        '60%': {
          opacity: 0
        },
        to: {
          opacity: 0.6
        }
      }
    }
  })
})

export default useGlobalStyles
