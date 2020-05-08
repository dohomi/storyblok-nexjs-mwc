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
import * as React from 'react';
import SbEditable from 'storyblok-react';
import TopAppBarWrap from './TopAppBar';
import { toggleLeftNavigation, toggleRightNavigation } from '../../../utils/state/actions';
import ToolbarLogo from './ToolbarLogo';
import Components from '@components';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import { Magnify, Menu } from 'mdi-material-ui';
import { useAppSetup } from '../../provider/AppSetupProvider';
var HeaderSimple = function (props) {
    var _a, _b;
    var settings = props.settings;
    var content = settings || {};
    var mobileNavBreakpoint = content.mobile_nav_breakpoint || 'sm';
    var navRight = content.toolbar || [];
    var hasRightDrawer = useAppSetup().hasRightDrawer;
    return (React.createElement(SbEditable, { content: content },
        React.createElement(TopAppBarWrap, __assign({}, props),
            React.createElement(IconButton, { className: "d-inline-flex d-" + mobileNavBreakpoint + "-none", onClick: function () { return toggleLeftNavigation(); } },
                React.createElement(Menu, null)),
            React.createElement(ToolbarLogo, { settings: content }),
            navRight.length > 0 && (React.createElement(Grid, { container: true, className: clsx('lm-toolbar__section', 'd-none', (_a = {}, _a["d-" + mobileNavBreakpoint + "-inline-flex"] = true, _a)) }, navRight.map(function (blok) { return Components(blok); }))),
            !!hasRightDrawer && (React.createElement(Grid, { container: true, className: clsx('lm-toolbar__section', (_b = {},
                    _b["d-" + mobileNavBreakpoint + "-none"] = true,
                    _b)) },
                React.createElement(IconButton, { onClick: function () { return toggleRightNavigation(); } },
                    React.createElement(Magnify, null)))))));
};
export default HeaderSimple;
