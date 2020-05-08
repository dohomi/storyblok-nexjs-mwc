import * as React from 'react';
import Components from '@components';
import ContentLink from './ContentLink';
var LinkWrap = function (_a) {
    var content = _a.content;
    var body = content.body || [];
    return (React.createElement(ContentLink, { className: 'lm-wrap-content__link', content: content }, body.map(function (blok) { return Components(blok); })));
};
export default LinkWrap;
