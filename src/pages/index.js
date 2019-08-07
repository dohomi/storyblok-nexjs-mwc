import StoryblokService from '../utils/StoryblokService'
import Index from '../components/pages/Index'
import DeviceDetectService from '../utils/DeviceDetectService'
import handleErrorContent from '../utils/handleErrorContent'

Index.getInitialProps = async ({query, req, res}) => {
  let slug = query.slug || 'home'
  if (slug === 'api/clear-cache') {
    return StoryblokService.flushCache() // flush cache if any Storyblok publish triggered
  }

  if (slug.match(/^.*\.[^\\]+$/)) {
    return {}
  }
  DeviceDetectService.setAppServices(req) // important to call first, webp is depending on this
  StoryblokService.setQuery(query)
  try {
    let [page, settings] = await Promise.all([
      StoryblokService.get(`cdn/stories/${slug}`),
      StoryblokService.get(`cdn/stories/settings`)
    ])
    let currentSlug = slug !== 'home' ? slug : '' // need to modify. maybe check if ROOT of storyblok config?
    const host = req ? req.headers.host : window.location.host
    const url = `https://${host}/${currentSlug}` // for seo purpose
    const pageProps = {
      page: page.data && page.data.story && page.data.story.content || {},
      settings: settings.data && settings.data.story && settings.data.story.content || {},
      url,
      overwriteDisableRobots: ['dev.', 'test.', 'preview.', 'prev.', 'beta.', 'localhost:'].some(i => host.startsWith(i))
    }
    DeviceDetectService.setLanguage(pageProps.settings.setup_language, pageProps.settings.setup_supported_languages, res)
    return pageProps

  } catch (e) {
    return handleErrorContent(e, res)
  }
}

export default Index
