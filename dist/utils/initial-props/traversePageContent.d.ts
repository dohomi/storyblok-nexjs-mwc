import { ListWidgetStoryblok, PageStoryblok } from '../../typings/generated/components-schema';
import { StoryData } from 'storyblok-js-client';
import { CategoryComponent, PageComponent } from '../../typings/generated/schema';
export declare const traversePageContent: (page: PageStoryblok, lookup?: string) => ListWidgetStoryblok[];
export declare const collectComponentData: (page: PageStoryblok, _allCategories: StoryData<CategoryComponent>[], allStories?: StoryData<PageComponent>[], _locale?: string | undefined) => Promise<{
    [k: string]: StoryData<PageComponent>[];
}>;
