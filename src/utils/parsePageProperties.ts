import {
  CategoryStoryblok,
  GlobalStoryblok,
  PageStoryblok,
  SeoOpenGraphStoryblok
} from '../typings/generated/components-schema'

export type PageSeoProps = {
  title: string
  description: string
  body: SeoOpenGraphStoryblok[]
  url: string
  disableRobots: boolean
}

export type AppPageProps = {
  settings: GlobalStoryblok
  page: PageStoryblok,
  pageSeo?: PageSeoProps
  error?: any,
  allStories: any[]
  allCategories: CategoryStoryblok[]
  locale: string | undefined
}
