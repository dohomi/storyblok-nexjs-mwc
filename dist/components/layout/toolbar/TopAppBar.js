import clsx from 'clsx';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useGlobalState } from '../../../utils/state/state';
import ContentSpace from '../ContentSpace';
import { useScrollTrigger } from '@material-ui/core';
import { useAppSetup } from '../../provider/AppSetupProvider';
import useScrollTop from '../../../utils/hooks/useScrollTop';
import { useDebounce } from 'use-debounce';
const useStyles = makeStyles((theme) => createStyles({
    topAppBar: {
        '& .lm-system-bar': {
            transitionDuration: '500ms',
            overflow: 'hidden',
            height: theme.toolbar.height.systemBar,
            [theme.breakpoints.only('xs')]: {
                display: 'none'
            }
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
            boxShadow: 'none',
            '& .MuiButtonBase-root': {
                color: '#fff'
            },
            '& .lm-system-bar': {
                backgroundColor: 'transparent !important'
            }
        },
        '&.lm-toolbar__scrolled': {
            '& .lm-system-bar': {
                marginTop: -1 * theme.toolbar.height.systemBar
                // height: '0 !important'
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
        },
        '&.lm-toolbar__scroll-collapse.lm-toolbar__collapsed .MuiToolbar-root': {
            height: 0,
            minHeight: 0,
            padding: 0,
            overflow: 'hidden',
            transitionDuration: '300ms'
        }
    },
    leftShift: {
        marginLeft: theme.drawer.left,
        width: `calc(100% - ${theme.drawer.left})`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.only('xs')]: {
            marginLeft: 0
        }
    },
    topAppBarCustom: (props) => {
        var _a, _b;
        const options = {};
        if ((_b = (_a = props.settings) === null || _a === void 0 ? void 0 : _a.toolbar_color) === null || _b === void 0 ? void 0 : _b.rgba) {
            options.backgroundColor = `${props.settings.toolbar_color.rgba} !important`;
        }
        return options;
    },
    toolbarCustom: (props) => {
        const options = {};
        const increasedFontSize = props.settings.toolbar_font_size;
        if (increasedFontSize) {
            options['& .MuiButton-root'] = {
                fontSize: increasedFontSize
            };
        }
        return options;
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
}));
const mapToolbarColor = {
    'primary': 'primary',
    'secondary': 'secondary',
    'dark': 'inherit',
    'white': 'inherit'
};
const TopAppBar = (props) => {
    var _a, _b;
    const classes = useStyles(props);
    const { settings } = props;
    const toolbarConfig = settings.toolbar_config || [];
    const appSetup = useAppSetup();
    const isScrolledTrigger = useScrollTrigger({ disableHysteresis: false });
    const [isScrolled] = useDebounce(isScrolledTrigger, 100);
    const [isLeftDrawerOpen] = useGlobalState('leftNavigationDrawer');
    const scrolledWithoutHysteresis = useScrollTop();
    const toolbarVariant = settings.toolbar_variant;
    let toolbarWidth = false;
    if (toolbarConfig.includes('fixed_width')) {
        toolbarWidth = settings.theme_container_width && settings.theme_container_width !== 'none' ? settings.theme_container_width : 'lg';
    }
    const isFixedTop = toolbarConfig.includes('fixed');
    const isScrollCollapse = toolbarConfig.includes('scroll_collapse');
    const showLeftShift = appSetup.drawerVariant !== 'temporary' && !appSetup.drawerBelowToolbar && isLeftDrawerOpen;
    return (React.createElement(React.Fragment, null,
        React.createElement(AppBar, { className: clsx(classes.topAppBar, {
                'lm-toolbar__text-bold': toolbarConfig.includes('text_bold'),
                'lm-toolbar__unelevated': toolbarConfig.includes('unelevated'),
                [`lm-toolbar__${toolbarVariant}`]: toolbarVariant,
                'lm-toolbar__transparent': appSetup.hasFeatureImage,
                'lm-toolbar__scrolled': scrolledWithoutHysteresis && (appSetup.toolbarMainHeight || appSetup.hasFeatureImage || !!props.SystemBar),
                'lm-toolbar__collapsed': isScrolled && appSetup.hasScrollCollapse,
                'lm-toolbar__scroll-collapse': isScrollCollapse,
                'lm-toolbar__with-system-bar': !!props.SystemBar,
                [classes.topAppBarCustom]: (_b = (_a = props.settings) === null || _a === void 0 ? void 0 : _a.toolbar_color) === null || _b === void 0 ? void 0 : _b.rgba,
                [classes.leftShift]: showLeftShift,
                [classes[`left-mobile-${appSetup.leftDrawerMediaBreakpoint || 'sm'}`]]: showLeftShift
            }), color: mapToolbarColor[toolbarVariant || 'default'], position: isFixedTop ? 'fixed' : 'relative' },
            props.SystemBar,
            React.createElement(Container, { maxWidth: toolbarWidth },
                React.createElement(Toolbar, { className: clsx(classes.toolbar, {
                        [classes.toolbarCustom]: props.settings.toolbar_font_size
                    }) }, props.children))),
        isFixedTop && !appSetup.hasFeatureImage && React.createElement(ContentSpace, null)));
};
export default TopAppBar;
