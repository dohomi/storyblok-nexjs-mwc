import Components from '@components';
import React from 'react';
import { usePageStyles } from './usePageStyle';
import clsx from 'clsx';
import { useGlobalState } from '../../utils/state/state';
import { useAppSetup } from '../provider/AppSetupProvider';
const MainContenWrap = ({ children }) => {
    const classes = usePageStyles();
    const appSetup = useAppSetup();
    const [isOpen] = useGlobalState('leftNavigationDrawer');
    return React.createElement("main", { className: clsx(classes.content, {
            [classes.contentWithRight]: appSetup.hasRightDrawer,
            [classes[`right-mobile-${appSetup.rightDrawerMediaBreakpoint || 'sm'}`]]: true,
            [classes.leftShift]: appSetup.drawerVariant !== 'temporary' && isOpen,
            [classes[`left-mobile-${appSetup.leftDrawerMediaBreakpoint || 'sm'}`]]: appSetup.drawerVariant !== 'temporary' && isOpen
        }) }, children);
};
const MainContent = ({ body }) => (React.createElement(MainContenWrap, null, body.map((blok) => Components(blok))));
export default MainContent;
