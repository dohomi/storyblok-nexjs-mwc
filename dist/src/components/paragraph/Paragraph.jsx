import SbEditable from 'storyblok-react';
import clsx from 'clsx';
import Markdown from './Markdown';
import * as React from 'react';
var Paragraph = function (_a) {
    var _b;
    var content = _a.content;
    var typography = content.typography || 'body1';
    var styleClasses = clsx('mdc-typography lm-markup', (_b = {},
        _b["mdc-typography--" + typography] = true,
        _b), content.style, content.class_names && content.class_names.values);
    var style = {};
    if (content.font) {
        style = {
            '--mdc-theme-font-default': "var(--mdc-theme-font-" + content.font + ")"
        };
    }
    return (<SbEditable content={content}>
      <Markdown content={content.text} className={styleClasses} style={style}/>
    </SbEditable>);
};
export default Paragraph;
