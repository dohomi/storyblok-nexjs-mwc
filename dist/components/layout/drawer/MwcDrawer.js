var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useEffect } from 'react';
import { useGlobalState } from '../../../utils/state/state';
import Drawer from '@material-ui/core/Drawer';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useAppSetup } from '../../provider/AppSetupProvider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
export var useStyles = makeStyles(function (theme) {
    var _a;
    return createStyles({
        leftDrawer: {
            width: theme.drawer.left,
            '& a': {
                color: 'inherit'
            }
        },
        aboveToolbar: {
            zIndex: theme.zIndex.drawer + 2
        },
        belowToolbar: {
            zIndex: theme.zIndex.appBar - 1
        },
        fullWidthMobile: (_a = {},
            _a[theme.breakpoints.only('xs')] = {
                width: '100%'
            },
            _a)
    });
});
var MwcDrawer = function (_a) {
    var _b, _c;
    var children = _a.children, backgroundProps = _a.backgroundProps;
    var classes = useStyles();
    var router = useRouter();
    var asPath = router === null || router === void 0 ? void 0 : router.asPath;
    var _d = useGlobalState('leftNavigationDrawer'), isOpen = _d[0], setOpen = _d[1];
    var appSetup = useAppSetup();
    var theme = useTheme();
    var matches = useMediaQuery(theme.breakpoints.up(appSetup.leftDrawerMediaBreakpoint || 'sm'));
    var drawerProps = {
        variant: appSetup.drawerVariant
    };
    useEffect(function () {
        if (appSetup.drawerVariant === 'temporary' || matches) {
            setOpen(false);
        }
    }, [asPath, appSetup, setOpen, matches]);
    var classList = backgroundProps === null || backgroundProps === void 0 ? void 0 : backgroundProps.className;
    return (React.createElement(Drawer, __assign({ open: isOpen, className: clsx('lm-main__drawer', classes.leftDrawer, (_b = {},
            _b[classes.aboveToolbar] = !appSetup.drawerBelowToolbar,
            _b[classes.belowToolbar] = appSetup.drawerBelowToolbar,
            _b[classes.fullWidthMobile] = appSetup.drawerFullWidthMobile,
            _b)), classes: {
            paper: clsx('lm-main__drawer', classList, classes.leftDrawer, (_c = {},
                _c[classes.aboveToolbar] = !appSetup.drawerBelowToolbar,
                _c[classes.belowToolbar] = appSetup.drawerBelowToolbar,
                _c[classes.fullWidthMobile] = appSetup.drawerFullWidthMobile,
                _c))
        }, PaperProps: {
            style: (backgroundProps === null || backgroundProps === void 0 ? void 0 : backgroundProps.style) ? backgroundProps.style : undefined
        }, onClose: function () { return setOpen(false); } }, drawerProps), children));
};
export default MwcDrawer;
