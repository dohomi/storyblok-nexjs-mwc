import {
  CategoryStoryblok,
  GlobalStoryblok,
  PageStoryblok,
  SeoOpenGraphStoryblok
} from '../typings/generated/components-schema'
import { DeviceDetectModule } from './DeviceDetectService'

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
  overwriteDisableIndex?: boolean
}

export type AppPageProps = {
  settings: GlobalStoryblok
  page: PageStoryblok,
  pageSeo?: PageSeoProps
  error?: ErrorProps,
  config: AppConfigProps,
  allStories: any[]
  allCategories: CategoryStoryblok[]
  locale: string | undefined,
  deviceService?: DeviceDetectModule
}
