import { FunctionComponent } from 'react';
import { ListsStoryblok, ListWidgetStoryblok } from '../../typings/generated/components-schema';
import { AppApiRequestPayload } from '../../typings/app';
declare const ListWidgetLists: FunctionComponent<{
    items: AppApiRequestPayload['allStories'];
    options: ListsStoryblok;
    content: ListWidgetStoryblok;
}>;
export default ListWidgetLists;
