import { GlobalStoryblok, PageStoryblok } from './generated/components-schema'
import { CategoryComponent, PageComponent, StaticcontainerComponent } from './generated/schema'
import { AppApiRequestPayload } from '@initialData/storyblokDeliveryResolver'
import { Story, StoryData } from 'storyblok-js-client'

type ErrorProps = {
  type: 'not_supported' | 'page_not_found' | 'settings_not_found' | 'server_error',
  status: number,
  url: string
}

export type AppApiRequestPayload = {
  page: Story,
  allStories: StoryData<PageComponent>[],
  settings: Story,
  locale?: string,
  allCategories: StoryData<CategoryComponent>[],
  allStaticContent: StoryData<StaticcontainerComponent>[],
  listWidgetData: { [k: string]: StoryData<PageComponent>[] }
}

export type AppPageProps = Pick<AppApiRequestPayload, 'allStories' | 'allStaticContent' | 'locale' | 'allCategories' | 'listWidgetData'>
  & {
  page?: PageStoryblok | null,
  settings?: GlobalStoryblok | null
  error?: ErrorProps
  query?: any,
  [k: string]: any
}
