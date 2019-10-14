import SbEditable from 'storyblok-react';
import { TopAppBarRow } from '@rmwc/top-app-bar';
import ToolbarSection from './ToolbarSection';
import clsx from 'clsx';
import * as React from 'react';
var ToolbarRow = function (_a) {
    var _b;
    var content = _a.content, settings = _a.settings;
    var body = content.body || [];
    var toolbarConfig = settings.toolbar_config || [];
    var className = clsx(content.class_names && content.class_names.values);
    var childClassName = clsx('lm-toolbar-row d-flex justify-content-center', (_b = {},
        _b['mdc-layout-grid--fixed-column-width'] = toolbarConfig.includes('fixed_width'),
        _b['w-100'] = !toolbarConfig.includes('fixed_width'),
        _b));
    return (<SbEditable content={content}>
      <TopAppBarRow className={className}>
        <div className={childClassName}>
          {body.map(function (p) { return <ToolbarSection content={p} settings={settings} key={p._uid}/>; })}
        </div>
      </TopAppBarRow>
    </SbEditable>);
};
export default ToolbarRow;
