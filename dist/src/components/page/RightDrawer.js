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
const RightDrawerWrap = ({ children }) => {
    const classes = usePageStyles();
    const theme = useTheme();
    const appSetup = useAppSetup();
    const matches = useMediaQuery(theme.breakpoints.up(appSetup.rightDrawerMediaBreakpoint || 'sm'));
    // const { isMobile } = useDeviceDimensions()
    const [rightIsOpen] = useGlobalState('rightNavigationDrawer');
    return React.createElement(Drawer, { variant: !matches ? 'temporary' : 'permanent', anchor: "right", classes: {
            paper: classes.rightDrawerPaper,
            modal: classes.rightModal,
            paperAnchorDockedRight: classes.rightDocked
        }, open: !matches ? rightIsOpen : true, onClose: () => closeNavigationDrawers() }, children);
};
const RightDrawer = ({ rightBody }) => {
    const classes = usePageStyles();
    return (React.createElement(RightDrawerWrap, null,
        React.createElement(ContentSpace, null),
        React.createElement("div", { className: classes.rightContent }, rightBody.map((blok) => Components(blok)))));
};
export default RightDrawer;
