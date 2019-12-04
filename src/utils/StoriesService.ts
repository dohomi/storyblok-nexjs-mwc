import { CategoryStoryblok } from '../typings/generated/components-schema'
import { PageItem, StaticcontainerItem } from '../typings/generated/schema'
import { AppConfigProps } from './parsePageProperties'

export const CONFIG: AppConfigProps = {
  previewToken: process.env.previewToken || '',
  publicToken: process.env.publicToken || '',
  languages: (process.env.languages && process.env.languages.split(',')) || [],
  defaultLocale: process.env.defaultLocale || 'en',
  rootDirectory: process.env.rootDirectory,
  overwriteLocale: process.env.overwriteLocale,
  suppressSlugLocale: !!process.env.suppressSlugLocale,
  overwriteDisableIndex: !!process.env.overwriteDisableIndex
}

class StoriesModule {
  stories: any[]
  categories: CategoryStoryblok[]
  staticContent: StaticcontainerItem[]
  tags: { value: string, label: string }[]
  urlMapping: any
  public locale: string | undefined

  constructor() {
    this.tags = []
    this.stories = []
    this.categories = []
    this.staticContent = []
    this.urlMapping = {}
    this.locale = undefined
  }

  setAllTags(tags: { value: string, label: string }[]) {
    this.tags = tags
  }

  setAllCategories(categories: CategoryStoryblok[]) {
    this.categories = categories
  }

  setLocale(locale: string | undefined) {
    this.locale = locale
  }

  getAllCategories() {
    return this.categories
  }

  getAllTags(): { value: string, label: string }[] {
    return this.tags
  }

  setAllStaticContent(staticContent: StaticcontainerItem[]) {
    this.staticContent = staticContent
  }

  getStaticContent(uid: string): StaticcontainerItem | undefined {
    return this.staticContent.find((item) => item.uuid === uid)
  }


  setAllStories(stories: PageItem[]) {
    this.stories = stories
    // stories.forEach((item, i) => {
    //   if (item.uuid === 'e6c274cc-5174-4fd2-94f3-f15a0d1d3436' || i < 2 || item.slug === 'free-brochure') {
    //
    //     console.log(item)
    //   }
    //   this.urlMapping[item.uuid as string] = item.path || item.full_slug
    // })
  }

  getAllStories() {
    return this.stories
  }
}

const StoriesService = new StoriesModule()

export default StoriesService
