import StoryblokService from './StoryblokService'

/**
 *
 * @param e
 * @param res
 * @param languagePrefix example: zh/
 * @return {Promise<{settings: null, page: null, error: {url: *, status: *}}>}
 */
const handleErrorContent = async (e, res, languagePrefix = '') => {
  const error = {
    status: e.response.status,
    url: e.response.config_prod.url
  }
  res && (res.statusCode = error.status) // set the response error code
  // in storyblok we only handle 404 for not found and any other error 500 including 400 etc.
  let page = {}
  let settings = {}
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
    error
  }
  return props
}

export default handleErrorContent
