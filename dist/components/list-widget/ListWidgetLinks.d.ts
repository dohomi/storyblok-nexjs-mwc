import { FunctionComponent } from 'react';
import { ListWidgetStoryblok, NavListStoryblok } from '../../typings/generated/components-schema';
import { AppApiRequestPayload } from '../../typings/app';
declare const ListWidgetLinks: FunctionComponent<{
    items: AppApiRequestPayload['allStories'];
    options: NavListStoryblok;
    content: ListWidgetStoryblok;
}>;
export default ListWidgetLinks;
