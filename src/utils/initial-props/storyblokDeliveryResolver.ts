import { StoriesParams } from 'storyblok-js-client'
import StoryblokService from '../StoryblokService'
import { CONFIG } from '../config'
import { AppApiRequestPayload } from '../../typings/app'
import fs from 'fs'
import { promisify } from 'util'
import { diskCache } from '@initialData/fileCache'

export const readFile = promisify(fs.readFile)
export const writeFile = promisify(fs.writeFile)




const resolveAllPromises = (promises: Promise<any>[]) => {
  return Promise.all(
    promises.map(p => p.catch(() => {
      // const errorObj = {
      //   status: e.response && e.response.status,
      //   url: e.response && e.response.config && e.response.config.url
      // }
      // console.log(errorObj)

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
    per_page: 25,
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
    per_page: 25,
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
    per_page: 25,
    excluding_fields: 'body,right_body,meta_robots,property,meta_description,seo_body',
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


export const apiRequestResolver = async ({ pageSlug, locale, isLandingPage }: ApiProps): Promise<AppApiRequestPayload> => {
  const settingsPath = getSettingsPath({ locale })
  const all: any[] = [
    StoryblokService.get(`cdn/stories/${pageSlug}`),
    diskCache.wrap('settings', () => StoryblokService.get(settingsPath)),
    diskCache.wrap('categories', () => StoryblokService.getAll('cdn/stories', getCategoryParams({ locale }))),
    diskCache.wrap('stories', () => StoryblokService.getAll('cdn/stories', getStoriesParams({ locale }))),//    Promise.resolve([])/**/,
    diskCache.wrap('static_container', () => StoryblokService.getAll('cdn/stories', getStaticContainer({ locale })))
  ]

  if (CONFIG.suppressSlugLocale && CONFIG.languages.length > 1 && !isLandingPage) {
    let [, ...languagesWithoutDefault] = CONFIG.languages // make sure default language is always first of array
    if (CONFIG.suppressSlugIncludeDefault) {
      languagesWithoutDefault.unshift(CONFIG.defaultLocale)
    }
    languagesWithoutDefault.forEach((locale) => {
      all.push(StoryblokService.get(`cdn/stories/${locale}/${pageSlug}`))
    })
  }

  let [page, settings, categories, stories, staticContent, ...otherPageLanguages] = await resolveAllPromises(all)

  if (page === null && otherPageLanguages.length) {
    otherPageLanguages.forEach((value, index) => {
      if (value) {
        locale = CONFIG.languages[CONFIG.suppressSlugIncludeDefault ? index : index + 1] // overwrite locale
        page = value // overwrite page values of localized page
      }
    })

    // make 2nd API calls to fetch locale based settings and other values
    let [localizedSettings, localizedCategories, localizedStories, localizedStaticContent] = await resolveAllPromises([
      StoryblokService.get(settingsPath),
      StoryblokService.getAll('cdn/stories', getCategoryParams({ locale })),
      Promise.resolve([])/*StoryblokService.getAll('cdn/stories', getStoriesParams({ locale }))*/,
      StoryblokService.getAll('cdn/stories', getStaticContainer({ locale }))
    ])

    return {
      page,
      locale,
      settings: localizedSettings,
      allCategories: localizedCategories,
      allStories: localizedStories,
      allStaticContent: localizedStaticContent,
      listWidgetData: {}
    }
  }

  return {
    page,
    settings,
    allCategories: categories,
    allStories: stories,
    locale,
    allStaticContent: staticContent,
    listWidgetData: {}
  }
}
