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
var ToolbarComponents = {
    'button': LmMuiButton,
    'nav_menu': Menu,
    'toolbar_logo': ToolbarLogo,
    'toolbar_navi_button': ToggleDrawerButton,
    'list_search_autocomplete': ListSearchAutocomplete,
    'headline': Headline
};
var Child = function (blok, settings) {
    if (typeof ToolbarComponents[blok.component] !== 'undefined') {
        return React.createElement(ToolbarComponents[blok.component], { key: blok._uid, content: blok, settings: settings });
    }
    return React.createElement(function () { return (React.createElement("div", { style: { color: 'red' } },
        "The component ",
        blok.component,
        " has not been created yet.")); }, { key: blok._uid });
};
var ToolbarSectionWrap = function (_a) {
    var children = _a.children, content = _a.content;
    var _b;
    var align = content.align;
    var theme = useTheme();
    var appSetup = useAppSetup();
    var matches = useMediaQuery(theme.breakpoints.up(appSetup.leftDrawerMediaBreakpoint || 'sm'));
    var hideOnMediaQuery = content.use_media_query && !matches;
    var invHideOnMediaQuery = content.inv_use_media_query && matches;
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Grid, { item: true, className: clsx((_b = content.class_names) === null || _b === void 0 ? void 0 : _b.values, {
                'h-100': !align,
                'd-inline-flex': !content.align && !hideOnMediaQuery && !invHideOnMediaQuery,
                'd-none': hideOnMediaQuery || invHideOnMediaQuery
            }), style: {
                alignItems: !align ? 'center' : undefined,
                alignSelf: align ? align : 'center'
            } }, children)));
};
var ToolbarSection = function (_a) {
    var settings = _a.settings, content = _a.content;
    var body = content.body || [];
    return (React.createElement(ToolbarSectionWrap, { content: content }, body.map(function (blok) { return Child(blok, settings); })));
};
export default ToolbarSection;
