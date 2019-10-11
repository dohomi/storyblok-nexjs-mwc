import { NextApiResponse, NextPageContext } from 'next'
import StoryblokService from '../../utils/StoryblokService'
import DeviceDetectService from '../../utils/DeviceDetectService'
import handleErrorContent from '../../utils/handleErrorContent'
import { GlobalStoryblok, PageStoryblok, SeoOpenGraphStoryblok } from '../../typings/generated/components-schema'

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
  error?: any
  hasFeature?: boolean
}

const getInitialPageProps = async (ctx: NextPageContext): Promise<AppPageProps> => {
  const { query, req, res, asPath, pathname } = ctx
  let slug: string = query.slug as string || 'home'
  console.log(slug, query, asPath, pathname)

  if (slug.match(/^.*\.[^\\]+$/)) {
    // todo differently!!. handle somehow with routes
    const notFoundVars: AppPageProps = {
      error: undefined,
      hasFeature: false,
      page: { _uid: '', component: 'page' },
      pageSeo: undefined,
      settings: { _uid: '', component: 'global', theme_base: 'base' }
    }
    console.log('not found', notFoundVars)
    return notFoundVars
  }
  DeviceDetectService.setAppServices(req) // important to call first, webp is depending on this
  StoryblokService.setQuery(query)
  try {
    let [page, settings] = await Promise.all([
      StoryblokService.get(`cdn/stories/${slug}`),
      StoryblokService.get(`cdn/stories/settings`)
    ])
    let currentSlug = slug !== 'home' ? slug : '' // need to modify. maybe check if ROOT of storyblok config?
    const host: string = req ? req.headers.host as string : window.location.host
    const url = `https://${host}/${currentSlug}` // for seo purpose
    const pageProps: PageStoryblok = page.data && page.data.story && page.data.story.content
    const settingsProps: GlobalStoryblok = settings.data && settings.data.story && settings.data.story.content
    const overwriteDisableRobots = ['dev.', 'test.', 'preview.', 'prev.', 'beta.', 'localhost:'].some(i => host.startsWith(i)) || host.endsWith('.now.sh')
    DeviceDetectService.setLanguage(settingsProps.setup_language, settingsProps.setup_supported_languages, res)
    const pageSeo = {
      title: pageProps.meta_title as string,
      description: pageProps.meta_description as string,
      disableRobots: overwriteDisableRobots || !!pageProps.meta_robots,
      body: pageProps.seo_body || [],
      url: url
    }
    const pageProperties = pageProps.property || []
    return {
      page: pageProps,
      settings: settingsProps,
      pageSeo,
      hasFeature: pageProperties.includes('has_feature')
    }
  } catch (e) {
    return await handleErrorContent(e, res as NextApiResponse)
  }
}

export default getInitialPageProps
