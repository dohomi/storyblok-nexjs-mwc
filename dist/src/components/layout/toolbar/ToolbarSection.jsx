import SbEditable from 'storyblok-react';
import { TopAppBarNavigationIcon, TopAppBarSection } from '@rmwc/top-app-bar';
import React from 'react';
import LmButton from '../../button/Button';
import Menu from '../../menu/Menu';
import { toggleLeftNavigation } from '../../../utils/state/actions';
import ToolbarLogo from './ToolbarLogo';
import ToolbarSearch from './ToolbarSearch';
import clsx from 'clsx';
var NaviButton = function (_a) {
    var content = _a.content, settings = _a.settings;
    var mobileNavBreakpoint = settings.mobile_nav_breakpoint || 'sm';
    var iconName = content.icon && content.icon.name || 'menu';
    return (<SbEditable content={content}>
      <TopAppBarNavigationIcon icon={iconName} className={"d-" + mobileNavBreakpoint + "-none"} onClick={toggleLeftNavigation}/>
    </SbEditable>);
};
var ToolbarComponents = {
    'button': LmButton,
    'nav_menu': Menu,
    'toolbar_logo': ToolbarLogo,
    'toolbar_navi_button': NaviButton,
    'toolbar_right_navi_button': NaviButton,
    'toolbar_search': ToolbarSearch
};
var Child = function (blok, settings) {
    if (typeof ToolbarComponents[blok.component] !== 'undefined') {
        return React.createElement(ToolbarComponents[blok.component], { key: blok._uid, content: blok, settings: settings });
    }
    return React.createElement(function () { return (<div style={{ color: 'red' }}>The component {blok.component} has not been created yet.</div>); }, { key: blok._uid });
};
var ToolbarSection = function (_a) {
    var settings = _a.settings, content = _a.content;
    var body = content.body || [];
    var className = clsx(content.class_names && content.class_names.values);
    return (<SbEditable content={content}>
      <TopAppBarSection alignEnd={content.align_end} className={className}>
        {body.map(function (blok) { return Child(blok, settings); })}
      </TopAppBarSection>
    </SbEditable>);
};
export default ToolbarSection;
