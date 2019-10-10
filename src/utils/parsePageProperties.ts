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


const mapStateProps = (pageProps: AppPageProps) => {
  const pageContent = pageProps.page
  const pageSeo: PageSeoProps = {
    title: pageContent.meta_title as string,
    description: pageContent.meta_description as string,
    disableRobots: !!pageContent.meta_robots,
    body: pageContent.seo_body || [],
    url: pageProps.url
  }
  if (pageProps.overwriteDisableRobots) {
    pageSeo.disableRobots = true
  }
  const properties = pageContent.property || []
  const hasFeature = properties.includes('has_feature')
  return {
    pageContent,
    hasFeature,
    pageSeo
  }
}

export default mapStateProps
