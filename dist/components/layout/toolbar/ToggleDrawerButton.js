import SbEditable from 'storyblok-react';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { toggleLeftNavigation, toggleRightNavigation } from '../../../utils/state/actions';
import LmIcon from '../../icon/LmIcon';
import MenuUi from 'mdi-material-ui/Menu';
import AppsIcon from 'mdi-material-ui/Apps';
import { useAppSetup } from '../../provider/AppSetupProvider';
var ToggleDrawerButton = function (_a) {
    var content = _a.content;
    var _b, _c;
    var rightDrawer = content.is_right_drawer;
    var _d = useAppSetup(), rightDrawerMediaBreakpoint = _d.rightDrawerMediaBreakpoint, leftDrawerMediaBreakpoint = _d.leftDrawerMediaBreakpoint, hasRightDrawer = _d.hasRightDrawer;
    if (rightDrawer && !hasRightDrawer) {
        return null; // if no right drawer on page hide
    }
    var breakpointClass = rightDrawer ? (rightDrawerMediaBreakpoint || 'sm') : (leftDrawerMediaBreakpoint || 'sm');
    return (React.createElement(SbEditable, { content: content },
        React.createElement(IconButton, { className: clsx((_b = content.class_names) === null || _b === void 0 ? void 0 : _b.values, "d-" + breakpointClass + "-none"), style: {
                width: 'max-content'
            }, onClick: function () { return rightDrawer ? toggleRightNavigation() : toggleLeftNavigation(); } }, ((_c = content.icon) === null || _c === void 0 ? void 0 : _c.name) ? React.createElement(LmIcon, { iconName: content.icon.name }) : (rightDrawer ? React.createElement(AppsIcon, null) : React.createElement(MenuUi, null)))));
};
export default ToggleDrawerButton;
