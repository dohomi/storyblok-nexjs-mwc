import Components from '@components';
import SbEditable from 'storyblok-react';
import * as React from 'react';
import { memo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { useGlobalState } from '../../utils/state/state';
import clsx from 'clsx';
import { useAppSetup } from '../provider/AppSetupProvider';
var useStyles = makeStyles(function (theme) {
    var _a;
    return createStyles({
        footer: {
            position: 'relative',
            zIndex: theme.zIndex.drawer + 1
        },
        leftShift: (_a = {
                marginLeft: theme.drawer.left,
                width: "calc(100% - " + theme.drawer.left + ")",
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                })
            },
            _a[theme.breakpoints.only('xs')] = {
                marginLeft: 0
            },
            _a)
    });
});
var FooterWrap = function (_a) {
    var _b;
    var children = _a.children;
    var classes = useStyles();
    var isLeftDrawerOpen = useGlobalState('leftNavigationDrawer')[0];
    var appSetup = useAppSetup();
    var hasLeftShift = appSetup.drawerVariant !== 'temporary' && isLeftDrawerOpen;
    return (React.createElement("footer", { className: clsx(classes.footer, (_b = {},
            _b[classes.leftShift] = hasLeftShift,
            _b[classes["left-mobile-" + (appSetup.leftDrawerMediaBreakpoint || 'sm')]] = hasLeftShift,
            _b)) }, children));
};
var Footer = function (_a) {
    var settings = _a.settings;
    var content = settings && settings.footer || [];
    return (React.createElement(SbEditable, { content: settings },
        React.createElement(FooterWrap, null, content.map(function (blok) { return Components(blok); }))));
};
export default memo(Footer);
