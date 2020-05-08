import { FunctionComponent } from 'react';
import { ListWidgetStoryblok } from '../../typings/generated/components-schema';
import { StoryData } from 'storyblok-js-client';
import { PageComponent } from '../../typings/generated/schema';
export declare const listWidgetFilter: (content: ListWidgetStoryblok, allStories: StoryData<PageComponent>[]) => StoryData<PageComponent>[];
declare const ListWidget: FunctionComponent<{
    content: ListWidgetStoryblok;
}>;
export default ListWidget;
