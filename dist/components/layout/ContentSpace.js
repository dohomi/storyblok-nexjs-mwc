import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useAppSetup } from '../provider/AppSetupProvider';
import useScrollTop from '../../utils/hooks/useScrollTop';
var useStyles = makeStyles(function (theme) {
    var _a, _b;
    return createStyles({
        contentSpace: (_a = {
                height: theme.toolbar.height.custom ? Number(theme.toolbar.height.custom) : theme.toolbar.height.mobile,
                transitionDuration: '500ms'
            },
            _a[theme.breakpoints.up('xs') + " and (orientation: landscape)"] = {
                height: theme.toolbar.height.custom ? Math.round(theme.toolbar.height.custom * 0.86) + theme.toolbar.height.systemBar : theme.toolbar.height.landscape + theme.toolbar.height.systemBar
            },
            _a[theme.breakpoints.up('sm')] = {
                height: theme.toolbar.height.custom ? Math.round(theme.toolbar.height.custom * 1.15) + theme.toolbar.height.systemBar : theme.toolbar.height.desktop + theme.toolbar.height.systemBar
            },
            _a['&.lm-scrolled'] = (_b = {
                    height: theme.toolbar.height.mobile
                },
                _b[theme.breakpoints.up('xs') + " and (orientation: landscape)"] = {
                    height: theme.toolbar.height.landscape //+ theme.toolbar.height.systemBar
                },
                _b[theme.breakpoints.up('sm')] = {
                    height: theme.toolbar.height.desktop //+ theme.toolbar.height.systemBar
                },
                _b),
            _a)
    });
});
var ContentSpace = function () {
    var classes = useStyles();
    var appSetup = useAppSetup();
    var scrolledWithoutHysteresis = useScrollTop();
    return (React.createElement("div", { className: clsx('lm-content-space', classes.contentSpace, {
            'lm-scrolled': scrolledWithoutHysteresis && (appSetup.toolbarMainHeight || appSetup.hasFeatureImage)
        }) }));
};
export default ContentSpace;
