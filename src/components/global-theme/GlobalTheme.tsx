import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { boolean } from '@storybook/addon-knobs'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { GlobalStoryblok } from '../../typings/generated/components-schema'

const GlobalTheme: FunctionComponent<{ settings: Partial<GlobalStoryblok> }> = ({ children, settings }) => {
  const isDark = boolean('Dark mode', false)
  const globalTheme: ThemeOptions = {
    palette: {
      type: isDark ? 'dark' : 'light',
      primary: {
        main: settings.theme_primary as string,
        contrastText: settings.theme_primary_contrast as string
      },
      secondary: {
        main: settings.theme_secondary as string
      }
    },
    overrides: {
      MuiDrawer: {
        modal: {
          '&.lm-main__drawer .MuiExpansionPanelDetails-root .MuiList-root': {
            width: '100%'
          }
        }
      },
      MuiPopover: {
        paper: {
          '& a': {
            color: 'inherit',
            textDecoration: 'none'
          }
        }
      },
      MuiAppBar: {
        root: {
          '& .MuiButtonBase-root, & a.lm-logo-header': {
            color: 'inherit',
            textDecoration: 'none',
            whiteSpace: 'nowrap'
          },
          '& .lm-toolbar__section': {
            justifyContent: 'flex-end'
          },
          '& .display-none': {
            display: 'none'
          }
        },
        colorPrimary: {
          '&.lm-toolbar__dark': {
            backgroundColor: '#424242'
          }
        }
      },
      MuiCard: {
        root: {
          '& > a': {
            textDecoration: 'none',
            color: 'inherit'
          }
        }
      },
      MuiList: {
        root: {
          '& > a': {
            color: 'inherit'
          }
        }
      }
    }
  }

  return (
    <ThemeProvider theme={createMuiTheme(globalTheme)}>{children}</ThemeProvider>
  )
}
export default GlobalTheme
