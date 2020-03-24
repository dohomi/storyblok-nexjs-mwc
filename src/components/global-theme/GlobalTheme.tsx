import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import * as React from 'react'
import { FunctionComponent, useMemo } from 'react'
import parseFont from '../../utils/parseFont'
// @ts-ignore
import useGlobalStyles from '../../utils/hooks/useGlobalStyles'
import { GlobalStoryblok, ToolbarRowStoryblok } from '../../typings/generated/components-schema'
import { useRouter } from 'next/router'
// import Fonts from '@fonts'


const mapThemeType = {
  'base': 'light',
  'dark': 'dark'
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    defaultContainerWidth: string | boolean;
    drawer: {
      left: string
      right: string
    }
    toolbar: {
      progressColor?: string
      height: {
        mobile: number,
        landscape: number,
        desktop: number,
        custom?: number,
        systemBar: number
      }
    }
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
    drawer: {
      left: string
      right: string
    }
    toolbar: {
      progressColor?: string
      height: {
        mobile: number,
        landscape: number,
        desktop: number,
        custom?: number
        systemBar: number
      }
    }
    alternativeFont?: {
      alt1?: string;
      alt2?: string;
      alt3?: string;
      alt4?: string;
    };
  }
}

const GlobalStyles = () => {
  useGlobalStyles()
  return null
}

const GlobalTheme: FunctionComponent<{
  settings: GlobalStoryblok
}> = ({ children, settings }) => {
  const router = useRouter()
  const storyblokBackend = router?.query?._storyblok
  // const ssrMatchMedia = (query: string) => ({
  //   matches: mediaQuery.match(query, {
  //     // The estimated CSS width of the browser.
  //     width: device?.width || 599
  //   })
  // })

  const themeUid = settings && settings._uid
  const theme = useMemo(() => {
      if (!themeUid) {
        return {}
      }

      if (!settings.theme_font_default) {
        settings.theme_font_default = 'Nunito:300,400,700'
      }
      let defaultContainerWidth: ThemeOptions['defaultContainerWidth'] = 'lg'
      if (settings.theme_container_width) {
        defaultContainerWidth = settings.theme_container_width === 'none' ? false : settings.theme_container_width
      }

      const firstMultiToolbar: ToolbarRowStoryblok | undefined = Array.isArray(settings.multi_toolbar) && settings.multi_toolbar[0]
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
        drawer: {
          left: `${settings.drawer_width}px` || '300px', // todo make configurable
          right: '254px'
        },
        toolbar: {
          progressColor: settings.toolbar_progress_color,
          height: {
            mobile: 56,
            landscape: 48,
            desktop: 64,
            custom: settings.toolbar_main_height ? settings.toolbar_main_height : undefined,
            systemBar: !!firstMultiToolbar ? (firstMultiToolbar?.height || 40) : 0
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
        // props: {
        //   MuiUseMediaQuery: {
        //     ssrMatchMedia
        //   }
        // },
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
              '& .MuiToolbar-root': {
                padding: '12px 0'
              },

              '& .lm-logo-header': {
                height: '100%',
                display: 'inline-block',
                '&.lm-logo-text': {
                  height: '100%',
                  display: 'inline-flex',
                  alignItems: 'center'
                },
                '& figure': {
                  boxSizing: 'border-box'
                },
                '& .MuiCollapse-wrapper': {
                  height: '100%'
                },
                '& img': {
                  display: 'block',
                  height: '100%'
                }
              },
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
              '&.lm-toolbar__dark': {
                backgroundColor: '#424242',
                color: 'white'
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

      return responsiveFontSizes(createMuiTheme(globalTheme))
    },
    [themeUid, storyblokBackend]
  )


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}
export default GlobalTheme
