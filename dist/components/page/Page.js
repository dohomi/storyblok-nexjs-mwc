import SbEditable from 'storyblok-react';
import { ParallaxProvider } from 'react-scroll-parallax';
import React from 'react';
import RightDrawer from './RightDrawer';
import MainContent from './MainContent';
var Page = function (props) {
    var content = props.content;
    var body = content.body || [];
    var rightBody = content.right_body || [];
    if (!body.length) {
        return React.createElement("div", null, "There is no content yet...");
    }
    if (!body.some(function (i) { return i.component === 'section_parallax'; })) {
        return (React.createElement(SbEditable, { content: content },
            rightBody.length > 0 && React.createElement(RightDrawer, { rightBody: rightBody, body: body }),
            React.createElement(MainContent, { body: body })));
    }
    return (React.createElement(SbEditable, { content: content },
        React.createElement(ParallaxProvider, null,
            rightBody.length > 0 && React.createElement(RightDrawer, { rightBody: rightBody, body: body }),
            React.createElement(MainContent, { body: body }))));
};
export default Page;
