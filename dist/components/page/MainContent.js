import Components from '@components';
import React from 'react';
import { usePageStyles } from './usePageStyle';
import clsx from 'clsx';
import { useGlobalState } from '../../utils/state/state';
import { useAppSetup } from '../provider/AppSetupProvider';
var MainContenWrap = function (_a) {
    var _b;
    var children = _a.children;
    var classes = usePageStyles();
    var appSetup = useAppSetup();
    var isOpen = useGlobalState('leftNavigationDrawer')[0];
    return React.createElement("main", { className: clsx(classes.content, (_b = {},
            _b[classes.contentWithRight] = appSetup.hasRightDrawer,
            _b[classes["right-mobile-" + (appSetup.rightDrawerMediaBreakpoint || 'sm')]] = true,
            _b[classes.leftShift] = appSetup.drawerVariant !== 'temporary' && isOpen,
            _b[classes["left-mobile-" + (appSetup.leftDrawerMediaBreakpoint || 'sm')]] = appSetup.drawerVariant !== 'temporary' && isOpen,
            _b)) }, children);
};
var MainContent = function (_a) {
    var body = _a.body;
    return (React.createElement(MainContenWrap, null, body.map(function (blok) { return Components(blok); })));
};
export default MainContent;
