import { CONFIG } from '../StoriesService'

export const prepareForStoryblok = (slug: string | string[] = 'home') => {
  let knownLocale = undefined
  let isLandingPage = undefined
  let slugAsArray = Array.isArray(slug) ? slug : [slug]
  let seoSlug = slugAsArray.join('/')
  if (seoSlug.endsWith('home')) {
    seoSlug = seoSlug.replace('home', '')
  }
  if (CONFIG.rootDirectory) {
    // if the first entry is not root directory append root directory
    slugAsArray[0] !== CONFIG.rootDirectory && slugAsArray.unshift(CONFIG.rootDirectory)
  } else if (CONFIG.suppressSlugLocale) {
    // suppress slug locale so remove any language key from the array (mainly for storyblok backend)
    if (CONFIG.languages.includes(slugAsArray[0])) {
      // first directory is a locale
      if (slugAsArray.length === 1) {
        // landing pages of locale
        knownLocale = slugAsArray[0]
        isLandingPage = true
        slugAsArray.push('home') // add 'home'
      } else if (slugAsArray.length === 2 && slugAsArray[1] === 'home') {
        // landing pages of locale (storyblok)
        knownLocale = slugAsArray[0]
        isLandingPage = true
      } else {
        slugAsArray.shift() // remove locale from path
      }
    }
  } else if (CONFIG.languages.includes(slugAsArray[0])) {
    // activated multi lang handling
    knownLocale = slugAsArray[0]
    if (slugAsArray.length === 1) {
      slugAsArray.push('home')
    }
  }

  const pageSlug = slugAsArray.join('/')
  return {
    pageSlug,
    knownLocale,
    isLandingPage,
    seoSlug
  }
}
