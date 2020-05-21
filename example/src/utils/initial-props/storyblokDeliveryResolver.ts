import { StoriesParams } from 'storyblok-js-client'
import {LmStoryblokService} from 'lumen-cms-core'
import { AppApiRequestPayload } from 'lumen-cms-core/src/typings/app'
import { endMeasureTime, startMeasureTime } from './timer'
import { checkCacheFileExists, readCacheFile, writeCacheFile } from './fileCache'

const rootDirectory = process.env.rootDirectory

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
  const directory = rootDirectory || locale || ''
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
  if (rootDirectory) {
    params.starts_with = `${rootDirectory}/`
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
  if (rootDirectory) {
    params.starts_with = `${rootDirectory}/`
  } else if (locale) {
    params.starts_with = `${locale}/`
  }
  return params
}

const getStoriesParams = ({ locale }: { locale?: string }) => {
  const params: StoriesParams = {
    per_page: 100,
    excluding_fields: 'body,right_body,meta_robots,property,meta_description,seo_body',
    sort_by: 'published_at:desc',
    filter_query: {
      'component': {
        'in': 'page'
      }
    }
  }
  if (rootDirectory) {
    params.starts_with = `${rootDirectory}/`
  } else if (locale) {
    params.starts_with = `${locale}/`
  }
  return params
}

type ApiProps = {
  pageSlug: string
  locale?: string
  isLandingPage?: boolean
  ssrHostname?: string
}
const configLanguages = (process.env.languages && process.env.languages.split(',')) || []

export const initSharedContentFromStoryblok = async () => {

  let [, ...languagesWithoutDefault] = configLanguages || []
  await Promise.all([
    fetchSharedContentFromStoryblok(),
    ...languagesWithoutDefault.map((locale => fetchSharedContentFromStoryblok(locale)))
  ]).then(() => console.log('fetch shared is finished!! cache should be set up'))
}

export const fetchSharedStoryblokContent = (locale?: string) => {
  return Promise.all([
    LmStoryblokService.get(getSettingsPath({ locale })),
    LmStoryblokService.getAll('cdn/stories', getCategoryParams({ locale })),
    LmStoryblokService.getAll('cdn/stories', getStoriesParams({ locale })),//    Promise.resolve([])/**/,
    LmStoryblokService.getAll('cdn/stories', getStaticContainer({ locale }))
  ])
}

export const fetchSharedContentFromStoryblok: any | void = async (locale?: string) => {
  const cacheName = `app-content${locale ? '-' + locale : ''}`
  startMeasureTime('start get file cache' + ' ' + cacheName)

  if (checkCacheFileExists(cacheName)) {
    //file exists
    console.log('read existing cache file', cacheName)
    const data = await readCacheFile(cacheName)
    return data
  } else {
    console.log('write cache file', cacheName)
    const context = await fetchSharedStoryblokContent(locale)
    await writeCacheFile(cacheName, context)
    return context
  }
  endMeasureTime('finish get file cache')
}

const fetchContentBasedOnRequest = async ({ ssrHostname, locale }: { ssrHostname?: string, locale?: string }) => {
  if (ssrHostname) {
    console.log('hostname:::SSR', ssrHostname)
    return await fetch(ssrHostname + '/api/shared-data' + (locale ? '/' + locale : ''))
      .then((res: any) => res.json())
  } else {
    return await fetchSharedContentFromStoryblok(locale)
  }
}

export const apiRequestResolver = async ({ pageSlug, locale, isLandingPage, ssrHostname }: ApiProps): Promise<AppApiRequestPayload> => {

  const [settings, categories, stories, staticContent] = await fetchContentBasedOnRequest({ locale, ssrHostname })

  const all: any[] = [
    LmStoryblokService.get(`cdn/stories/${pageSlug}`)
  ]

  if (process.env.suppressSlugLocale && configLanguages.length > 1 && !isLandingPage) {
    let [, ...languagesWithoutDefault] = configLanguages // make sure default language is always first of array
    if (process.env.suppressSlugIncludeDefault) {
      languagesWithoutDefault.unshift(process.env.defaultLocale)
    }
    languagesWithoutDefault.forEach((locale) => {
      all.push(LmStoryblokService.get(`cdn/stories/${locale}/${pageSlug}`))
    })
  }

  let [page, ...otherPageLanguages] = await resolveAllPromises(all)

  if (page === null && otherPageLanguages.length) {
    otherPageLanguages.forEach((value, index) => {
      if (value) {
        locale = configLanguages[process.env.suppressSlugIncludeDefault ? index : index + 1] // overwrite locale
        page = value // overwrite page values of localized page
      }
    })

    // make 2nd API calls to fetch locale based settings and other values
    let [localizedSettings, localizedCategories, localizedStories, localizedStaticContent] = await fetchContentBasedOnRequest({
      locale,
      ssrHostname
    })

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
