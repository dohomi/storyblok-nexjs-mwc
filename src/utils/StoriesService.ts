import { CategoryStoryblok } from '../typings/generated/components-schema'

class StoriesModule {
  stories: any[]
  categories: CategoryStoryblok[]

  constructor() {
    this.stories = []
    this.categories = []
  }

  setAllCategories(categories: CategoryStoryblok[]) {
    this.categories = categories
  }

  getAllCategories() {
    return this.categories
  }

  setAllStories(stories: any[]) {
    this.stories = stories
  }

  getAllStories() {
    return this.stories
  }
}

const StoriesService = new StoriesModule()

export default StoriesService
