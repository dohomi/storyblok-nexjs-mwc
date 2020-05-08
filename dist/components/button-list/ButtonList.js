import SbEditable from 'storyblok-react';
import Components from '@components';
import clsx from 'clsx';
import React from 'react';
var ButtonList = function (_a) {
    var content = _a.content;
    var body = content.body || [];
    var properties = content.property || [];
    var classNames = clsx('d-flex', content.class_names && content.class_names.values, {
        'lm-button-list__margin-left': properties.includes('margin_left')
    });
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: classNames }, body.map(function (i) { return Components(i); }))));
};
export default ButtonList;
