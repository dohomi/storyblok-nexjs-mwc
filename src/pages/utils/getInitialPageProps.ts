import { NextApiResponse, NextPageContext } from 'next'
import StoryblokService from '../../utils/StoryblokService'
import DeviceDetectService from '../../utils/DeviceDetectService'
import handleErrorContent from '../../utils/handleErrorContent'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'
import { AppPageProps } from '../../utils/parsePageProperties'

const getInitialPageProps = async (ctx: NextPageContext): Promise<AppPageProps> => {
  const { query, req, res } = ctx
  let slug: string = query.slug as string || 'home'

  if (slug.match(/^.*\.[^\\]+$/) && res) {
    console.log('not found', query)
    // res.writeHead(301, {
    //   Location: slug
    // })
    // res.end()
  }
  DeviceDetectService.setAppServices(req) // important to call first, webp is depending on this
  StoryblokService.setQuery(query)
  try {
    let [page, settings, categories, stories] = await Promise.all([
      StoryblokService.get(`cdn/stories/${slug}`),
      StoryblokService.get(`cdn/stories/settings`),
      StoryblokService.get('cdn/stories', {
        per_page: 100,
        sort_by: 'content.name:asc',
        filter_query: {
          'component': {
            'in': 'category'
          }
        }
      }),
      StoryblokService.get(`cdn/stories`, {
        per_page: 100,
        excluding_fields: 'body,meta_robots,property,meta_title,meta_description,seo_body',
        filter_query: {
          'component': {
            'in': 'page'
          }
        }
      })
    ])
    let currentSlug = slug !== 'home' ? slug : '' // need to modify. maybe check if ROOT of storyblok config?
    const host: string = req ? req.headers.host as string : window.location.host
    const url = `https://${host}/${currentSlug}` // for seo purpose
    const pageProps: PageStoryblok = page.data && page.data.story && page.data.story.content
    const settingsProps: GlobalStoryblok = settings.data && settings.data.story && settings.data.story.content
    const overwriteDisableRobots = ['dev.', 'test.', 'preview.', 'prev.', 'beta.', 'localhost:'].some(i => host.startsWith(i)) || host.endsWith('.now.sh')
    DeviceDetectService.setLanguage(settingsProps.setup_language, settingsProps.setup_supported_languages, res)

    const allStories = (stories.data && stories.data.stories) || []
    const allCategories = (categories.data && categories.data.stories) || []

    // StoriesService.setAllStories(allStories)
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
      hasFeature: pageProperties.includes('has_feature'),
      allStories,
      allCategories
    }
  } catch (e) {
    return await handleErrorContent(e, res as NextApiResponse)
  }
}

export default getInitialPageProps
