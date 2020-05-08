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
const HeaderSimple = (props) => {
    const { settings } = props;
    const content = settings || {};
    const mobileNavBreakpoint = content.mobile_nav_breakpoint || 'sm';
    const navRight = content.toolbar || [];
    const { hasRightDrawer } = useAppSetup();
    return (React.createElement(SbEditable, { content: content },
        React.createElement(TopAppBarWrap, Object.assign({}, props),
            React.createElement(IconButton, { className: `d-inline-flex d-${mobileNavBreakpoint}-none`, onClick: () => toggleLeftNavigation() },
                React.createElement(Menu, null)),
            React.createElement(ToolbarLogo, { settings: content }),
            navRight.length > 0 && (React.createElement(Grid, { container: true, className: clsx('lm-toolbar__section', 'd-none', { [`d-${mobileNavBreakpoint}-inline-flex`]: true }) }, navRight.map(blok => Components(blok)))),
            !!hasRightDrawer && (React.createElement(Grid, { container: true, className: clsx('lm-toolbar__section', {
                    [`d-${mobileNavBreakpoint}-none`]: true
                }) },
                React.createElement(IconButton, { onClick: () => toggleRightNavigation() },
                    React.createElement(Magnify, null)))))));
};
export default HeaderSimple;
