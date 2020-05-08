import Components from '@components';
import * as React from 'react';
import { useGlobalState } from '../../utils/state/state';
import { closeNavigationDrawers } from '../../utils/state/actions';
import Drawer from '@material-ui/core/Drawer';
import ContentSpace from '../layout/ContentSpace';
import { usePageStyles } from './usePageStyle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useAppSetup } from '../provider/AppSetupProvider';
var RightDrawerWrap = function (_a) {
    var children = _a.children;
    var classes = usePageStyles();
    var theme = useTheme();
    var appSetup = useAppSetup();
    var matches = useMediaQuery(theme.breakpoints.up(appSetup.rightDrawerMediaBreakpoint || 'sm'));
    // const { isMobile } = useDeviceDimensions()
    var rightIsOpen = useGlobalState('rightNavigationDrawer')[0];
    return React.createElement(Drawer, { variant: !matches ? 'temporary' : 'permanent', anchor: "right", classes: {
            paper: classes.rightDrawerPaper,
            modal: classes.rightModal,
            paperAnchorDockedRight: classes.rightDocked
        }, open: !matches ? rightIsOpen : true, onClose: function () { return closeNavigationDrawers(); } }, children);
};
var RightDrawer = function (_a) {
    var rightBody = _a.rightBody;
    var classes = usePageStyles();
    return (React.createElement(RightDrawerWrap, null,
        React.createElement(ContentSpace, null),
        React.createElement("div", { className: classes.rightContent }, rightBody.map(function (blok) { return Components(blok); }))));
};
export default RightDrawer;
