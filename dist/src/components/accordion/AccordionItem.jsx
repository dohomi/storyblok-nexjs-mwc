import SbEditable from 'storyblok-react';
import { CollapsibleList, SimpleListItem } from '@rmwc/list';
import Components from 'components';
var AccordionItem = function (content) {
    var metaIcon = content.metaIcon || 'chevron_right';
    var body = content.body || [];
    return (<SbEditable content={content}>
      <CollapsibleList handle={<SimpleListItem text={content.title} metaIcon={metaIcon}/>}>
        {body.map(function (blok) { return Components(blok); })}
      </CollapsibleList>
    </SbEditable>);
};
export default AccordionItem;
