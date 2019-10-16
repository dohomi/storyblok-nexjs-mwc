import StoryblokService from './StoryblokService'
import { AppPageProps } from './parsePageProperties'
import { NextApiResponse } from 'next'

const handleErrorContent = async (e: any, res: NextApiResponse, languagePrefix = ''): Promise<AppPageProps> => {
  const error = {
    status: e.response.status,
    url: e.response.config_prod && e.response.config_prod.url
  }
  res && (res.statusCode = error.status) // set the response error code
  // in storyblok we only handle 404 for not found and any other error 500 including 400 etc.
  let page: any = {}
  let settings: any = {}
  try {
    const storyblokErrorPageSlug = `error-${error.status === 404 ? '404' : '500'}`
    page = await StoryblokService.get(`cdn/stories/${languagePrefix}${storyblokErrorPageSlug}`)
  } catch (e) {
    console.error('error page not found')
  }
  try {
    settings = await StoryblokService.get(`cdn/stories/settings/${languagePrefix}`)
  } catch (e) {
    console.error('settings page not found')
  }

  const props = {
    page: page.data && page.data.story && page.data.story.content || {},
    settings: settings.data && settings.data.story && settings.data.story.content || {},
    error,
    hasFeature: false,
    allStories: [],
    allCategories: []
  }
  return props
}

export default handleErrorContent
