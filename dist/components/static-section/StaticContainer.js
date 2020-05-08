import Components from '@components';
import * as React from 'react';
import SbEditable from 'storyblok-react';
const StaticContainer = ({ content }) => {
    const body = content.body || [];
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: "lm-static-container" }, body.map((blok) => Components(blok)))));
};
export default StaticContainer;
