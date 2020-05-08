import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import { memo, useMemo } from 'react';
import parseFont from '../../utils/parseFont';
import useGlobalStyles from '../../utils/hooks/useGlobalStyles';
import StoryblokService from '../../utils/StoryblokService';
const mapThemeType = {
    'base': 'light',
    'dark': 'dark'
};
const GlobalStyles = memo(() => {
    useGlobalStyles();
    return null;
});
const GlobalTheme = ({ children, settings, rightDrawerWidth }) => {
    const storyblokBackend = StoryblokService.insideVisualComposer();
    const themeUid = settings && settings._uid;
    const theme = useMemo(() => {
        if (!themeUid) {
            return {};
        }
        if (!settings.theme_font_default) {
            settings.theme_font_default = 'Nunito:300,400,700';
        }
        let defaultContainerWidth = 'lg';
        if (settings.theme_container_width) {
            defaultContainerWidth = settings.theme_container_width === 'none' ? false : settings.theme_container_width;
        }
        const firstMultiToolbar = Array.isArray(settings.multi_toolbar) && settings.multi_toolbar[0];
        const globalTheme = {
            palette: {
                type: mapThemeType[settings.theme_base || 'base'],
                primary: {
                    main: settings.theme_primary || '#1769aa',
                    contrastText: settings.theme_primary_contrast || '#fff'
                },
                secondary: {
                    main: settings.theme_secondary || '#ab003c',
                    contrastText: settings.theme_secondary_contrast || '#fff'
                }
            },
            drawer: {
                left: `${settings.drawer_width || 285}px`,
                right: `${rightDrawerWidth || 254}px`
            },
            toolbar: {
                progressColor: settings.toolbar_progress_color,
                height: {
                    mobile: 56,
                    landscape: 48,
                    desktop: 64,
                    custom: settings.toolbar_main_height ? settings.toolbar_main_height : undefined,
                    systemBar: (firstMultiToolbar === null || firstMultiToolbar === void 0 ? void 0 : firstMultiToolbar.is_system_bar) ? ((firstMultiToolbar === null || firstMultiToolbar === void 0 ? void 0 : firstMultiToolbar.height) || 40) : 0
                }
            },
            typography: {
                fontFamily: settings.theme_font_default && parseFont(settings.theme_font_default)
            },
            alternativeFont: {
                alt1: settings.theme_font_alt1 && parseFont(settings.theme_font_alt1),
                alt2: settings.theme_font_alt2 && parseFont(settings.theme_font_alt2),
                alt3: settings.theme_font_alt3 && parseFont(settings.theme_font_alt3),
                alt4: settings.theme_font_alt4 && parseFont(settings.theme_font_alt4)
            },
            defaultContainerWidth: defaultContainerWidth,
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
        };
        return responsiveFontSizes(createMuiTheme(globalTheme));
    }, [themeUid, storyblokBackend]);
    return (React.createElement(ThemeProvider, { theme: theme },
        React.createElement(GlobalStyles, null),
        children));
};
export default GlobalTheme;
