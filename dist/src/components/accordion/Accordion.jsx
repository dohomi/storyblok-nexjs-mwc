import SbEditable from 'storyblok-react';
import AccordionItem from './AccordionItem';
import * as React from 'react';
var Accordion = function (_a) {
    var content = _a.content;
    var body = content.body || [];
    return (<SbEditable content={content}>
      <div className="lm-accordion">
        {body.map(function (blok) { return <AccordionItem {...blok} key={blok._uid}/>; })}
      </div>
    </SbEditable>);
};
export default Accordion;
