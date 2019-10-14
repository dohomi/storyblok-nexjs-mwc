class StoriesModule {
  stories: any[]

  constructor() {
    this.stories = []
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
