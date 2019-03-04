import StoryblokService from './StoryblokService'

class SettingsService {
  constructor () {
    this.settings = null
    this.query = {}
  }

  setSettings (values) {
    this.settings = values
  }

  getQuery (param) {
    return this.query[param]
  }

  setQuery (query) {
    this.query = query
  }

  async getSettings () {
    if (process.env.NODE_ENV === 'development' || this.getQuery('_storyblok') || (typeof window !== 'undefined' && window.storyblok) || !this.settings) {
      return this.loadSettings()
    }
    return this.settings
  }

  async loadSettings () {
    const settings = await StoryblokService.get(`cdn/stories/settings`)
    this.setSettings(settings)
    return settings
  }
}

const settingsInstance = new SettingsService()

export default settingsInstance
