import { FunctionComponent } from 'react';
import { CardListStoryblok, ListWidgetStoryblok } from '../../typings/generated/components-schema';
import { AppApiRequestPayload } from '../../typings/app';
declare const ListWidgetCards: FunctionComponent<{
    content: ListWidgetStoryblok;
    items: AppApiRequestPayload['allStories'];
    options: CardListStoryblok;
}>;
export default ListWidgetCards;
