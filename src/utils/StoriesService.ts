import { CategoryStoryblok } from '../typings/generated/components-schema'
import { PageItem } from '../typings/generated/schema'

class StoriesModule {
  stories: any[]
  categories: CategoryStoryblok[]
  urlMapping: any
  public locale: string | undefined

  constructor() {
    this.stories = []
    this.categories = []
    this.urlMapping = {}
    this.locale = undefined
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
