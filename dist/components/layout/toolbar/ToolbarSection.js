import SbEditable from 'storyblok-react';
import React from 'react';
import Menu from '../../menu/NavMenu';
import ToolbarLogo from './ToolbarLogo';
import LmMuiButton from '../../button/LmMuiButton';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import ListSearchAutocomplete from '../../list-widget/ListSearchAutocomplete';
import ToggleDrawerButton from './ToggleDrawerButton';
import { useTheme } from '@material-ui/core/styles';
import { useAppSetup } from '../../provider/AppSetupProvider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Headline from '../../headline/Headline';
const ToolbarComponents = {
    'button': LmMuiButton,
    'nav_menu': Menu,
    'toolbar_logo': ToolbarLogo,
    'toolbar_navi_button': ToggleDrawerButton,
    'list_search_autocomplete': ListSearchAutocomplete,
    'headline': Headline
};
const Child = (blok, settings) => {
    if (typeof ToolbarComponents[blok.component] !== 'undefined') {
        return React.createElement(ToolbarComponents[blok.component], { key: blok._uid, content: blok, settings });
    }
    return React.createElement(() => (React.createElement("div", { style: { color: 'red' } },
        "The component ",
        blok.component,
        " has not been created yet.")), { key: blok._uid });
};
const ToolbarSectionWrap = ({ children, content }) => {
    var _a;
    const align = content.align;
    const theme = useTheme();
    const appSetup = useAppSetup();
    const matches = useMediaQuery(theme.breakpoints.up(appSetup.leftDrawerMediaBreakpoint || 'sm'));
    const hideOnMediaQuery = content.use_media_query && !matches;
    const invHideOnMediaQuery = content.inv_use_media_query && matches;
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Grid, { item: true, className: clsx((_a = content.class_names) === null || _a === void 0 ? void 0 : _a.values, {
                'h-100': !align,
                'd-inline-flex': !content.align && !hideOnMediaQuery && !invHideOnMediaQuery,
                'd-none': hideOnMediaQuery || invHideOnMediaQuery
            }), style: {
                alignItems: !align ? 'center' : undefined,
                alignSelf: align ? align : 'center'
            } }, children)));
};
const ToolbarSection = ({ settings, content }) => {
    const body = content.body || [];
    return (React.createElement(ToolbarSectionWrap, { content: content }, body.map(blok => Child(blok, settings))));
};
export default ToolbarSection;
