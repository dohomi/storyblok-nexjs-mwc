import SbEditable from 'storyblok-react';
import TopAppBarWrap from './TopAppBar';
import LmToolbarRow from './ToolbarRow';
import Divider from '../../divider/Divider';
import React from 'react';
const Components = {
    'toolbar_row': LmToolbarRow,
    'divider': Divider
};
const Child = (blok, settings) => {
    if (typeof Components[blok.component] !== 'undefined') {
        return React.createElement(Components[blok.component], { key: blok._uid, content: blok, settings });
    }
    return React.createElement(() => (React.createElement("div", { style: { color: 'red' } },
        "The component ",
        blok.component,
        " has not been created yet.")), { key: blok._uid });
};
const HeaderCustom = (props) => {
    const content = props.settings || {};
    let rows = content.multi_toolbar || [];
    let SystemBar = null;
    const systemBarProps = rows.find(item => item.is_system_bar);
    if (systemBarProps) {
        SystemBar = Child(systemBarProps, content);
        // rows.splice(systemBarProps, 1)
        rows = rows.filter(i => i._uid !== systemBarProps._uid);
    }
    return (React.createElement(SbEditable, { content: content },
        React.createElement(TopAppBarWrap, Object.assign({}, props, { SystemBar: SystemBar }), rows.map(p => Child(p, content)))));
};
export default HeaderCustom;
