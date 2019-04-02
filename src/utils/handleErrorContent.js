import StoryblokService from './StoryblokService'

const handleErrorContent = async (e, res) => {
  const error = {
    status: e.response.status,
    url: e.response.config.url
  }
  res && (res.statusCode = error.status) // set the response error code
  // in storyblok we only handle 404 for not found and any other error 500 including 400 etc.
  let page = null
  let settings = null
  try {
    page = await StoryblokService.get(`cdn/stories/error-${error.status === 404 ? '404' : '500'}`)
  } catch (e) {
    console.error('error page not found')
  }
  try {
    settings = await StoryblokService.get(`cdn/stories/settings`)
  } catch (e) {
    console.error('settings page not found')
  }
  return {
    page, settings, error
  }
}

export default handleErrorContent
