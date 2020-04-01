import { CategoryStoryblok, GlobalStoryblok, PageStoryblok } from './generated/components-schema'
import { StaticcontainerItem } from './generated/schema'

type ErrorProps = {
  type: 'not_supported' | 'page_not_found' | 'settings_not_found' | 'server_error',
  status: number,
  url: string
}

export type AppPageProps = {
  settings: GlobalStoryblok
  page: PageStoryblok,
  error?: ErrorProps,
  allStories: any[]
  allCategories: CategoryStoryblok[]
  allStaticContent: StaticcontainerItem[]
  locale: string | undefined
  query?: any
}
