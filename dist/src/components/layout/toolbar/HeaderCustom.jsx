import SbEditable from 'storyblok-react';
import { ThemeProvider } from '@rmwc/theme';
import TopAppBarWrap from './TopAppBar';
import { toolbar } from '../../../utils/themeContentSection';
import { TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import LmToolbarRow from './ToolbarRow';
import Divider from '../../divider/Divider';
import React, { createRef, useEffect } from 'react';
import { useWindowDimensions } from '../../provider/WindowDimensionsProvider';
var Components = {
    'toolbar_row': LmToolbarRow,
    'divider': Divider
};
var Child = function (blok, settings) {
    if (typeof Components[blok.component] !== 'undefined') {
        return React.createElement(Components[blok.component], { key: blok._uid, content: blok, settings: settings });
    }
    return React.createElement(function () { return (<div style={{ color: 'red' }}>The component {blok.component} has not been created yet.</div>); }, { key: blok._uid });
};
var HeaderCustom = function (props) {
    var dimensions = useWindowDimensions();
    var content = props.settings || {};
    var toolbarConfig = content.toolbar_config || [];
    var transparentToolbar = props.hasFeature;
    var rows = content.multi_toolbar || [];
    var color = content.toolbar_variant;
    var theme = toolbar.primary;
    var toolbarAdjust = createRef();
    if (color) {
        theme = toolbar[color];
    }
    useEffect(function () {
        // adjust padding top
        var toolbar = document.querySelector('.lm-toolbar');
        var toolbarAdjustElement = toolbarAdjust.current;
        toolbarAdjustElement && toolbar && (toolbarAdjustElement.style.paddingTop = toolbar.clientHeight + 1 + "px");
    }, [dimensions]);
    return (<SbEditable content={content}>
      <ThemeProvider options={theme}>
        <TopAppBarWrap transparentToolbar={transparentToolbar} toolbarConfig={toolbarConfig} fixed={toolbarConfig.includes('fixed')}>
          {rows.map(function (p) { return Child(p, content); })}
        </TopAppBarWrap>
      </ThemeProvider>
      {!props.hasFeature && <TopAppBarFixedAdjust ref={toolbarAdjust}/>}
    </SbEditable>);
};
export default HeaderCustom;
