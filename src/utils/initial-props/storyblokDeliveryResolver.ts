import { StoriesParams } from 'storyblok-js-client'
import StoryblokService from '../StoryblokService'
import { CONFIG } from '../StoriesService'

const resolveAllPromises = (promises: Promise<any>[]) => {
  return Promise.all(
    promises.map(p => p.catch((e) => {
      const errorObj = {
        status: e.response && e.response.status,
        url: e.response && e.response.config && e.response.config.url
      }
      console.log(errorObj)

      return null
    }))
  )
}

const getSettingsPath = ({ locale }: { locale?: string }) => {
  const directory = CONFIG.rootDirectory || locale || ''
  return `cdn/stories/${directory ? `${directory}/` : ''}settings`
}

const getCategoryParams = ({ locale }: { locale?: string }) => {
  const params: StoriesParams = {
    per_page: 100,
    sort_by: 'content.name:asc',
    filter_query: {
      'component': {
        'in': 'category'
      }
    }
  }
  if (CONFIG.rootDirectory) {
    params.starts_with = `${CONFIG.rootDirectory}/`
  } else if (locale) {
    params.starts_with = `${locale}/`
  }
  return params
}

const getStaticContainer = ({ locale }: { locale?: string }) => {
  const params: StoriesParams = {
    per_page: 30,
    sort_by: 'content.name:asc',
    filter_query: {
      'component': {
        'in': 'static_container'
      }
    }
  }
  if (CONFIG.rootDirectory) {
    params.starts_with = `${CONFIG.rootDirectory}/`
  } else if (locale) {
    params.starts_with = `${locale}/`
  }
  return params
}

const getStoriesParams = ({ locale }: { locale?: string }) => {
  const params: StoriesParams = {
    per_page: 100,
    excluding_fields: 'body,meta_robots,property,meta_title,meta_description,seo_body',
    sort_by: 'published_at:desc',
    filter_query: {
      'component': {
        'in': 'page'
      }
    }
  }
  if (CONFIG.rootDirectory) {
    params.starts_with = `${CONFIG.rootDirectory}/`
  } else if (locale) {
    params.starts_with = `${locale}/`
  }
  return params
}

type ApiProps = {
  pageSlug: string
  locale?: string
  isLandingPage?: boolean
}

export const apiRequestResolver = async ({ pageSlug, locale, isLandingPage }: ApiProps) => {
  const all: any[] = [
    StoryblokService.get(`cdn/stories/${pageSlug}`),
    StoryblokService.get(getSettingsPath({ locale })),
    StoryblokService.getAll('cdn/stories', getCategoryParams({ locale })),
    StoryblokService.getAll('cdn/stories', getStoriesParams({ locale })),
    StoryblokService.getAll('cdn/stories', getStaticContainer({ locale }))
  ]

  if (CONFIG.suppressSlugLocale && CONFIG.languages.length > 1 && !isLandingPage) {
    let [, ...languagesWithoutDefault] = CONFIG.languages // make sure default language is always first of array
    languagesWithoutDefault.forEach((locale) => {
      all.push(StoryblokService.get(`cdn/stories/${locale}/${pageSlug}`))
    })
  }

  let [page, settings, categories, stories, staticContent, ...otherPageLanguages] = await resolveAllPromises(all)

  if (page === null && otherPageLanguages.length) {
    otherPageLanguages.forEach((value, index) => {
      if (value) {
        locale = CONFIG.languages[index + 1] // overwrite locale
        page = value // overwrite page values of localized page
      }
    })

    // make 2nd API calls to fetch locale based settings and other values
    let [localizedSettings, localizedCategories, localizedStories, localizedStaticContent] = await resolveAllPromises([
      StoryblokService.get(getSettingsPath({ locale })),
      StoryblokService.getAll('cdn/stories', getCategoryParams({ locale })),
      StoryblokService.getAll('cdn/stories', getStoriesParams({ locale })),
      StoryblokService.getAll('cdn/stories', getStaticContainer({ locale }))
    ])
    return {
      page,
      locale,
      settings: localizedSettings,
      categories: localizedCategories,
      stories: localizedStories.filter((i: any) => i.tag_list.length > 0),
      staticContent: localizedStaticContent
    }
  }

  return {
    page,
    settings,
    categories,
    stories: stories.filter((i: any) => i.tag_list.length > 0),
    locale,
    staticContent
  }
}
