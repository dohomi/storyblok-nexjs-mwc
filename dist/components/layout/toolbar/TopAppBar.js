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
var useStyles = makeStyles(function (theme) {
    var _a, _b, _c, _d;
    return createStyles({
        topAppBar: {
            '& .lm-system-bar': (_a = {
                    transitionDuration: '500ms',
                    overflow: 'hidden',
                    height: theme.toolbar.height.systemBar
                },
                _a[theme.breakpoints.only('xs')] = {
                    display: 'none'
                },
                _a),
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
                '& .MuiToolbar-root': (_b = {
                        height: theme.toolbar.height.mobile
                    },
                    _b[theme.breakpoints.up('xs') + " and (orientation: landscape)"] = {
                        height: theme.toolbar.height.landscape
                    },
                    _b[theme.breakpoints.up('sm')] = {
                        height: theme.toolbar.height.desktop
                    },
                    _b)
            },
            '&.lm-toolbar__scroll-collapse.lm-toolbar__collapsed .MuiToolbar-root': {
                height: 0,
                minHeight: 0,
                padding: 0,
                overflow: 'hidden',
                transitionDuration: '300ms'
            }
        },
        leftShift: (_c = {
                marginLeft: theme.drawer.left,
                width: "calc(100% - " + theme.drawer.left + ")",
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                })
            },
            _c[theme.breakpoints.only('xs')] = {
                marginLeft: 0
            },
            _c),
        topAppBarCustom: function (props) {
            var _a, _b;
            var options = {};
            if ((_b = (_a = props.settings) === null || _a === void 0 ? void 0 : _a.toolbar_color) === null || _b === void 0 ? void 0 : _b.rgba) {
                options.backgroundColor = props.settings.toolbar_color.rgba + " !important";
            }
            return options;
        },
        toolbarCustom: function (props) {
            var options = {};
            var increasedFontSize = props.settings.toolbar_font_size;
            if (increasedFontSize) {
                options['& .MuiButton-root'] = {
                    fontSize: increasedFontSize
                };
            }
            return options;
        },
        toolbar: (_d = {
                height: theme.toolbar.height.custom ? Number(theme.toolbar.height.custom) : theme.toolbar.height.mobile,
                transitionDuration: '500ms'
            },
            _d[theme.breakpoints.up('xs') + " and (orientation: landscape)"] = {
                height: theme.toolbar.height.custom ? Math.round(theme.toolbar.height.custom * 0.86) : theme.toolbar.height.landscape
            },
            _d[theme.breakpoints.up('sm')] = {
                height: theme.toolbar.height.custom ? Math.round(theme.toolbar.height.custom * 1.15) : theme.toolbar.height.desktop
            },
            _d)
    });
});
var mapToolbarColor = {
    'primary': 'primary',
    'secondary': 'secondary',
    'dark': 'inherit',
    'white': 'inherit'
};
var TopAppBar = function (props) {
    var _a, _b;
    var _c, _d;
    var classes = useStyles(props);
    var settings = props.settings;
    var toolbarConfig = settings.toolbar_config || [];
    var appSetup = useAppSetup();
    var isScrolledTrigger = useScrollTrigger({ disableHysteresis: false });
    var isScrolled = useDebounce(isScrolledTrigger, 100)[0];
    var isLeftDrawerOpen = useGlobalState('leftNavigationDrawer')[0];
    var scrolledWithoutHysteresis = useScrollTop();
    var toolbarVariant = settings.toolbar_variant;
    var toolbarWidth = false;
    if (toolbarConfig.includes('fixed_width')) {
        toolbarWidth = settings.theme_container_width && settings.theme_container_width !== 'none' ? settings.theme_container_width : 'lg';
    }
    var isFixedTop = toolbarConfig.includes('fixed');
    var isScrollCollapse = toolbarConfig.includes('scroll_collapse');
    var showLeftShift = appSetup.drawerVariant !== 'temporary' && !appSetup.drawerBelowToolbar && isLeftDrawerOpen;
    return (React.createElement(React.Fragment, null,
        React.createElement(AppBar, { className: clsx(classes.topAppBar, (_a = {
                    'lm-toolbar__text-bold': toolbarConfig.includes('text_bold'),
                    'lm-toolbar__unelevated': toolbarConfig.includes('unelevated')
                },
                _a["lm-toolbar__" + toolbarVariant] = toolbarVariant,
                _a['lm-toolbar__transparent'] = appSetup.hasFeatureImage,
                _a['lm-toolbar__scrolled'] = scrolledWithoutHysteresis && (appSetup.toolbarMainHeight || appSetup.hasFeatureImage || !!props.SystemBar),
                _a['lm-toolbar__collapsed'] = isScrolled && appSetup.hasScrollCollapse,
                _a['lm-toolbar__scroll-collapse'] = isScrollCollapse,
                _a['lm-toolbar__with-system-bar'] = !!props.SystemBar,
                _a[classes.topAppBarCustom] = (_d = (_c = props.settings) === null || _c === void 0 ? void 0 : _c.toolbar_color) === null || _d === void 0 ? void 0 : _d.rgba,
                _a[classes.leftShift] = showLeftShift,
                _a[classes["left-mobile-" + (appSetup.leftDrawerMediaBreakpoint || 'sm')]] = showLeftShift,
                _a)), color: mapToolbarColor[toolbarVariant || 'default'], position: isFixedTop ? 'fixed' : 'relative' },
            props.SystemBar,
            React.createElement(Container, { maxWidth: toolbarWidth },
                React.createElement(Toolbar, { className: clsx(classes.toolbar, (_b = {},
                        _b[classes.toolbarCustom] = props.settings.toolbar_font_size,
                        _b)) }, props.children))),
        isFixedTop && !appSetup.hasFeatureImage && React.createElement(ContentSpace, null)));
};
export default TopAppBar;
