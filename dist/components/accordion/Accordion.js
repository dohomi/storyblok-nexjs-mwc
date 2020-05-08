import SbEditable from 'storyblok-react';
import AccordionItem from './AccordionItem';
import React, { useState } from 'react';
const Accordion = ({ content }) => {
    const [opened, setOpen] = useState('');
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: "lm-accordion" }, (content.body || []).map((blok, iteration) => React.createElement(AccordionItem, { content: blok, options: content, opened: opened, setOpen: setOpen, iteration: iteration, key: blok._uid })))));
};
export default Accordion;
