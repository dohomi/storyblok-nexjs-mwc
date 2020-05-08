import { FunctionComponent } from 'react';
import { AccordionItemStoryblok, AccordionStoryblok } from '../../typings/generated/components-schema';
declare const AccordionItem: FunctionComponent<{
    content: AccordionItemStoryblok;
    options: AccordionStoryblok;
    opened: string;
    setOpen: Function;
    iteration: number;
}>;
export default AccordionItem;
