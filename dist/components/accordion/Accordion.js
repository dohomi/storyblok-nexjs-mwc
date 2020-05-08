import SbEditable from 'storyblok-react';
import AccordionItem from './AccordionItem';
import React, { useState } from 'react';
var Accordion = function (_a) {
    var content = _a.content;
    var _b = useState(''), opened = _b[0], setOpen = _b[1];
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: "lm-accordion" }, (content.body || []).map(function (blok, iteration) { return React.createElement(AccordionItem, { content: blok, options: content, opened: opened, setOpen: setOpen, iteration: iteration, key: blok._uid }); }))));
};
export default Accordion;
