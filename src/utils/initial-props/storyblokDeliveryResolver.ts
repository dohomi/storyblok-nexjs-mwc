import { StoriesParams } from 'storyblok-js-client'
import StoryblokService from '../StoryblokService'
import { CONFIG } from '../config'
import { AppApiRequestPayload } from '../../typings/app'
import { readCacheFile, writeCacheFile } from '@initialData/fileCache'
import { endMeasureTime, startMeasureTime } from '@initialData/timer'


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
    per_page: 100,
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

export const initSharedContentFromStoryblok = async () => {
  let [, ...languagesWithoutDefault] = CONFIG.languages || []
  await Promise.all([
    fetchSharedContentFromStoryblok(undefined, true),
    ...languagesWithoutDefault.map((locale => fetchSharedContentFromStoryblok(locale, true)))
  ]).then(() => console.log('fetch shared is finished!! cache should be set up'))
}

export const fetchSharedContentFromStoryblok: any | void = async (locale?: string, setCache?: boolean) => {
  // const all = diskCache.wrap(cacheName, function() {
  //   console.log(locale, arguments)
  //   return allPromiseFunc
  // })
  const cacheName = `app-content${locale ? '-' + locale : ''}`
  if (setCache) {
    const context = await Promise.all([
      StoryblokService.get(getSettingsPath({ locale })),
      StoryblokService.getAll('cdn/stories', getCategoryParams({ locale })),
      StoryblokService.getAll('cdn/stories', getStoriesParams({ locale })),//    Promise.resolve([])/**/,
      StoryblokService.getAll('cdn/stories', getStaticContainer({ locale }))
    ])
    await writeCacheFile(cacheName, context)
  } else {
    startMeasureTime('start get file cache' + ' ' + locale)
    try {
      const data = await readCacheFile(cacheName)
      return data
    } catch (e) {
      console.log('FAILED!!! read cache file failed. Start re-init', cacheName)
      await initSharedContentFromStoryblok()
      return await fetchSharedContentFromStoryblok(locale)
    }
    endMeasureTime('finish get file cache')
  }
}


export const apiRequestResolver = async ({ pageSlug, locale, isLandingPage }: ApiProps): Promise<AppApiRequestPayload> => {

  const [settings, categories, stories, staticContent] = await fetchSharedContentFromStoryblok(locale)

  const all: any[] = [
    StoryblokService.get(`cdn/stories/${pageSlug}`)
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

  let [page, ...otherPageLanguages] = await resolveAllPromises(all)

  if (page === null && otherPageLanguages.length) {
    otherPageLanguages.forEach((value, index) => {
      if (value) {
        locale = CONFIG.languages[CONFIG.suppressSlugIncludeDefault ? index : index + 1] // overwrite locale
        page = value // overwrite page values of localized page
      }
    })

    // make 2nd API calls to fetch locale based settings and other values
    let [localizedSettings, localizedCategories, localizedStories, localizedStaticContent] = await fetchSharedContentFromStoryblok(locale)

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
