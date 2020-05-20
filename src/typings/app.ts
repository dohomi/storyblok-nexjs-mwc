import { GlobalStoryblok, PageStoryblok } from './generated/components-schema'
import { CategoryComponent, PageComponent, StaticcontainerComponent } from './generated/schema'
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
  listWidgetData: { [k: string]: StoryData<PageComponent>[] } | null
}

export type AppPageProps =
  Pick<AppApiRequestPayload, 'allStaticContent' | 'locale' | 'allCategories' | 'listWidgetData'>
  & {
  page?: PageStoryblok | null
  settings?: GlobalStoryblok | null
  error?: ErrorProps
  query?: any
  insideStoryblok?: boolean
  [k: string]: any
}
