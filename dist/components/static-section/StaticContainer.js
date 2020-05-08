import Components from '@components';
import * as React from 'react';
import SbEditable from 'storyblok-react';
var StaticContainer = function (_a) {
    var content = _a.content;
    var body = content.body || [];
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: "lm-static-container" }, body.map(function (blok) { return Components(blok); }))));
};
export default StaticContainer;
