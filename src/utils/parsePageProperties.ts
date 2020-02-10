import {
  CategoryStoryblok,
  GlobalStoryblok,
  PageStoryblok,
  SeoOpenGraphStoryblok
} from '../typings/generated/components-schema'
import { StaticcontainerItem } from '../typings/generated/schema'

export type PageSeoProps = {
  title: string
  description: string
  body: SeoOpenGraphStoryblok[]
  url: string
  disableRobots: boolean
}

type ErrorProps = {
  type: 'not_supported' | 'page_not_found' | 'settings_not_found' | 'server_error',
  status: number,
  url: string
}

export interface AppConfigProps {
  defaultLocale: string
  publicToken: string
  previewToken: string
  languages: string[]
  rootDirectory?: string
  overwriteLocale?: string
  suppressSlugLocale?: boolean
  suppressSlugIncludeDefault?: boolean
  overwriteDisableIndex?: boolean
  sitemapIgnorePath?: string
  GA?: string
  TAWKTO?: string
}

export type AppPageProps = {
  settings: GlobalStoryblok
  page: PageStoryblok,
  pageSeo?: PageSeoProps
  error?: ErrorProps,
  allStories: any[]
  allCategories: CategoryStoryblok[]
  allStaticContent: StaticcontainerItem[]
  locale: string | undefined
}
