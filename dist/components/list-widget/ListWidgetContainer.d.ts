import { FunctionComponent } from 'react';
import { CardListStoryblok, ListsStoryblok, ListWidgetStoryblok, NavListStoryblok } from '../../typings/generated/components-schema';
import { AppApiRequestPayload } from '../../typings/app';
declare const ListWidgetContainer: FunctionComponent<{
    listOption: (ListsStoryblok | CardListStoryblok | NavListStoryblok);
    content: ListWidgetStoryblok;
    items: AppApiRequestPayload['allStories'];
}>;
export default ListWidgetContainer;
