import CollapsibleListSection from './CollapsibleListSection';
import React from 'react';
import DrawerButton from './DrawerButton';
import ImageElement from '../../image/ImageElement';
import Headline from '../../headline/Headline';
import DateHeadline from '../../headline/DateHeadline';
import Divider from '../../divider/Divider';
import { useAppSetup } from '../../provider/AppSetupProvider';
import ToggleDrawerButton from '../toolbar/ToggleDrawerButton';
var Components = {
    'button': DrawerButton,
    'toolbar_navi_button': ToggleDrawerButton,
    'nav_menu': CollapsibleListSection,
    'list_search_autocomplete': function () { return null; },
    'image': ImageElement,
    'headline': Headline,
    'date_headline': DateHeadline,
    'divider': Divider
};
var Child = function (blok) {
    if (typeof Components[blok.component] !== 'undefined') {
        return React.createElement(Components[blok.component], { content: blok, key: blok._uid });
    }
    return React.createElement(function () { return (React.createElement("div", { style: { color: 'red' } },
        "The component ",
        blok.component,
        " has not been created yet.")); }, { key: blok._uid });
};
var DrawerContentList = function (_a) {
    var content = _a.content;
    var appSetup = useAppSetup();
    var childs = (appSetup.hasDrawer ? content.drawer_body : content.toolbar) || [];
    if (!appSetup.hasDrawer && content.multi_toolbar && content.multi_toolbar.length) {
        childs = [];
        content.multi_toolbar.forEach(function (row) {
            var rowItems = row.body || [];
            rowItems.forEach(function (section) {
                var sectionItems = section.body || [];
                sectionItems.forEach(function (item) {
                    if (['toolbar_search', 'button', 'nav_menu'].includes(item.component)) {
                        childs.push(item);
                    }
                });
            });
        });
    }
    return (React.createElement(React.Fragment, null, childs.map(function (props) { return Child(props); })));
};
export default DrawerContentList;
