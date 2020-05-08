import Components from '@components';
import SbEditable from 'storyblok-react';
import * as React from 'react';
import { memo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { useGlobalState } from '../../utils/state/state';
import clsx from 'clsx';
import { useAppSetup } from '../provider/AppSetupProvider';
const useStyles = makeStyles((theme) => createStyles({
    footer: {
        position: 'relative',
        zIndex: theme.zIndex.drawer + 1
    },
    leftShift: {
        marginLeft: theme.drawer.left,
        width: `calc(100% - ${theme.drawer.left})`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.only('xs')]: {
            marginLeft: 0
        }
    }
}));
const FooterWrap = ({ children }) => {
    const classes = useStyles();
    const [isLeftDrawerOpen] = useGlobalState('leftNavigationDrawer');
    const appSetup = useAppSetup();
    const hasLeftShift = appSetup.drawerVariant !== 'temporary' && isLeftDrawerOpen;
    return (React.createElement("footer", { className: clsx(classes.footer, {
            [classes.leftShift]: hasLeftShift,
            [classes[`left-mobile-${appSetup.leftDrawerMediaBreakpoint || 'sm'}`]]: hasLeftShift
        }) }, children));
};
const Footer = ({ settings }) => {
    const content = settings && settings.footer || [];
    return (React.createElement(SbEditable, { content: settings },
        React.createElement(FooterWrap, null, content.map((blok) => Components(blok)))));
};
export default memo(Footer);
