import { GlobalStoryblok, PageStoryblok, SeoOpenGraphStoryblok } from '../typings/generated/components-schema'

type PageSeoProps = {
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
  error?: any
}