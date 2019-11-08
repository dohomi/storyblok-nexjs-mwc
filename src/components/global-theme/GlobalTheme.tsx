import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import * as React from 'react'
import { FunctionComponent, useEffect } from 'react'
import { GlobalStoryblok } from '../../typings/generated/components-schema'
import Fonts from '@fonts'
import DeviceDetectService from '../../utils/DeviceDetectService'
import parseFont from '../../utils/parseFont'

const mapThemeType = {
  'base': 'light',
  'dark': 'dark'
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    defaultContainerWidth: string | boolean;
    alternativeFont: {
      alt1: string;
      alt2: string;
      alt3: string;
      alt4: string;
    };
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    defaultContainerWidth?: string | boolean;
    alternativeFont?: {
      alt1?: string;
      alt2?: string;
      alt3?: string;
      alt4?: string;
    };
  }
}

const GlobalTheme: FunctionComponent<{ settings: Partial<GlobalStoryblok> }> = ({ children, settings }) => {
  if (!settings.theme_font_default) {
    settings.theme_font_default = 'Nunito:300,400,700'
  }
  let defaultContainerWidth: ThemeOptions['defaultContainerWidth'] = 'lg'
  if (settings.theme_container_width) {
    defaultContainerWidth = settings.theme_container_width === 'none' ? false : settings.theme_container_width
  }
  const globalTheme: ThemeOptions = {
    palette: {
      type: mapThemeType[settings.theme_base as string || 'base'],
      primary: {
        main: settings.theme_primary as string,
        contrastText: settings.theme_primary_contrast as string
      },
      secondary: {
        main: settings.theme_secondary as string,
        contrastText: settings.theme_secondary_contrast as string
      }
    },
    typography: {
      fontFamily: settings.theme_font_default && parseFont(settings.theme_font_default) as string
    },
    alternativeFont: {
      alt1: settings.theme_font_alt1 && parseFont(settings.theme_font_alt1) as string,
      alt2: settings.theme_font_alt2 && parseFont(settings.theme_font_alt2) as string,
      alt3: settings.theme_font_alt3 && parseFont(settings.theme_font_alt3) as string,
      alt4: settings.theme_font_alt4 && parseFont(settings.theme_font_alt4) as string
    },
    defaultContainerWidth: defaultContainerWidth,
    overrides: {
      MuiContainer: {},
      MuiTypography: {
        root: {
          '& > p': {
            margin: 0
          }
        }
      },
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
          '& .MuiButtonBase-root.lm-default-color, & a.lm-logo-header': {
            color: 'inherit',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            '&.MuiButton-outlined,&.lm-outlined': {
              borderColor: 'currentColor'
            }
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
      },
      MuiButton: {
        label: {
          textTransform: 'initial'
        }
      }
    }
  }

  useEffect(
    () => {
      Fonts(settings)
      DeviceDetectService.setAppServices()
    },
    []
  )

  const theme = createMuiTheme(globalTheme)
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>{children}</ThemeProvider>
  )
}
export default GlobalTheme
