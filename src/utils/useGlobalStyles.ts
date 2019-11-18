import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import getNprogressJss from './jss/npgrogress'

const useGlobalStyles = makeStyles((theme: Theme) => {
  const spacing = {}
  const directions = [{ key: 't', val: 'Top' }, { key: 'l', val: 'Left' }, { key: 'r', val: 'Right' }, {
    key: 'b',
    val: 'Bottom'
  }]
  for (let i = 0; i <= 5; i++) {
    for (const dir of directions) {
      spacing[`.p${dir.key}-${i}`] = {
        [`padding${dir.val}`]: `${theme.spacing(i)}px !important`
      }
      spacing[`.m${dir.key}-${i}`] = {
        [`margin${dir.val}`]: `${theme.spacing(i)}px !important`
      }
      spacing[`.p-${i}`] = {
        [`padding`]: `${theme.spacing(i)}px !important`
      }
      spacing[`.m-${i}`] = {
        [`margin`]: `${theme.spacing(i)}px !important`
      }
      spacing[`.mx-${i}`] = {
        [`marginLeft`]: `${theme.spacing(i)}px !important`,
        [`marginRight`]: `${theme.spacing(i)}px !important`
      }
      spacing[`.my-${i}`] = {
        [`marginTop`]: `${theme.spacing(i)}px !important`,
        [`marginBottom`]: `${theme.spacing(i)}px !important`
      }
      spacing[`.px-${i}`] = {
        [`paddingLeft`]: `${theme.spacing(i)}px !important`,
        [`paddingRight`]: `${theme.spacing(i)}px !important`
      }
      spacing[`.py-${i}`] = {
        [`paddingTop`]: `${theme.spacing(i)}px !important`,
        [`paddingBottom`]: `${theme.spacing(i)}px !important`
      }
    }
  }
  const dark = '#303030'
  console.log('use main styles!!!!')
  return createStyles({
    '@global': {
      ...getNprogressJss(theme),
      ...spacing,
      '.img-fluid': {
        maxWidth: '100%',
        height: 'auto'
      },
      'a': {
        textDecoration: 'none'
      },
      '.badge, .badge-pill': {
        display: 'inline-block',
        padding: '.25em .4em',
        backgroundColor: theme.palette.type === 'dark' ? '#f5f5f5' : dark,
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
        backgroundColor: '#ccc',
        color: 'rgba(0, 0, 0, 0.87)'
      },
      '.badge-dark': {
        backgroundColor: dark,
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
      '.mh-100': {
        minHeight: '100%'
      },
      '.h-100': {
        height: '100%'
      },
      '.mw-100': {
        minWidth: '100%'
      },
      '.w-100': {
        width: '100%'
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
      '.font-weight-bolder': {
        fontWeight: 'bolder'
      },
      '.font-weight-light': {
        fontWeight: 'light'
      },
      '.font-weight-lighter': {
        fontWeight: 'lighter'
      },
      '.font-weight-normal': {
        fontWeight: 'normal'
      },
      '.text-uppercase': {
        textTransform: 'uppercase'
      },
      '.text-monospace': {
        fontFamily: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'
      },
      '.font-italic': {
        fontStyle: 'italic'
      },
      '.text-primary': {
        color: theme.palette.primary.main
      },
      '.text-black-50': {
        color: 'rgba(0,0,0,0.5)'
      },
      '.text-white-50': {
        color: 'rgba(255,255,255,0.5)'
      },
      '.text-secondary': {
        color: theme.palette.secondary.main
      },
      '.text-primary-text': {
        color: theme.palette.text.primary
      },
      '.text-primary-secondary': {
        color: theme.palette.text.secondary
      },
      '.text-muted': {
        color: theme.palette.text.hint
      },
      '.text-white': {
        color: theme.palette.common.white
      },
      '.text-danger': {
        color: theme.palette.error.main
      },
      '.bg-primary': {
        backgroundColor: theme.palette.primary.main
      },
      '.bg-secondary': {
        backgroundColor: theme.palette.secondary.main
      },
      '.bg-danger': {
        backgroundColor: theme.palette.error.main
      },
      '.bg-white': {
        backgroundColor: theme.palette.common.white
      },
      '.bg-black': {
        backgroundColor: theme.palette.common.black
      },
      '.bg-dark': {
        backgroundColor: dark
      },
      '.bg-light': {
        backgroundColor: '#ccc'
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
      '.d-none': {
        display: 'none'
      },
      '.d-inline-flex': {
        display: 'inline-flex'
      },
      '.d-block': {
        display: 'block'
      },
      [theme.breakpoints.up('sm')]: {
        '.d-sm-inline-flex': {
          display: 'inline-flex'
        },
        '.d-sm-none': {
          display: 'none'
        },
        '.d-sm-block': {
          display: 'block'
        }
      },
      [theme.breakpoints.up('md')]: {
        '.d-md-inline-flex': {
          display: 'inline-flex'
        },
        '.d-md-none': {
          display: 'none'
        },
        '.d-md-block': {
          display: 'block'
        }
      },
      [theme.breakpoints.up('lg')]: {
        '.d-lg-inline-flex': {
          display: 'inline-flex'
        },
        '.d-lg-none': {
          display: 'none'
        }
      }
    }
  })
})

export default useGlobalStyles
