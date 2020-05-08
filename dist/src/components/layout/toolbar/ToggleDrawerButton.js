import SbEditable from 'storyblok-react';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { toggleLeftNavigation, toggleRightNavigation } from '../../../utils/state/actions';
import LmIcon from '../../icon/LmIcon';
import MenuUi from 'mdi-material-ui/Menu';
import AppsIcon from 'mdi-material-ui/Apps';
import { useAppSetup } from '../../provider/AppSetupProvider';
const ToggleDrawerButton = ({ content }) => {
    var _a, _b;
    const rightDrawer = content.is_right_drawer;
    const { rightDrawerMediaBreakpoint, leftDrawerMediaBreakpoint, hasRightDrawer } = useAppSetup();
    if (rightDrawer && !hasRightDrawer) {
        return null; // if no right drawer on page hide
    }
    const breakpointClass = rightDrawer ? (rightDrawerMediaBreakpoint || 'sm') : (leftDrawerMediaBreakpoint || 'sm');
    return (React.createElement(SbEditable, { content: content },
        React.createElement(IconButton, { className: clsx((_a = content.class_names) === null || _a === void 0 ? void 0 : _a.values, `d-${breakpointClass}-none`), style: {
                width: 'max-content'
            }, onClick: () => rightDrawer ? toggleRightNavigation() : toggleLeftNavigation() }, ((_b = content.icon) === null || _b === void 0 ? void 0 : _b.name) ? React.createElement(LmIcon, { iconName: content.icon.name }) : (rightDrawer ? React.createElement(AppsIcon, null) : React.createElement(MenuUi, null)))));
};
export default ToggleDrawerButton;
