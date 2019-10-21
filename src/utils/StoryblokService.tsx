import StoryblokClient from 'storyblok-js-client'

const StoryblokToken: {
  preview: string
  public: string
} = {
  preview: process.env.STORYBLOK_PREVIEW as string,
  public: process.env.STORYBLOK_PUBLIC as string
}

class StoryblokService {
  private devMode: boolean
  private token: string
  private client: StoryblokClient
  private query: any

  constructor() {
    this.devMode = false // If true it always loads draft
    this.token = process.env.NODE_ENV === 'development' ? StoryblokToken.preview as string : StoryblokToken.public as string
    this.client = new StoryblokClient({
      accessToken: this.token,
      cache: {
        clear: 'auto',
        type: 'memory'
      }
    })

    this.query = {}
  }

  flushCache() {
    console.log('flush cashed triggered. ENV Vars:', StoryblokToken.preview, StoryblokToken.public)
    console.log('current token:', this.client.getToken())
    this.client.flushCache()
    return true
  }

  getCacheVersion() {
    return this.client.cacheVersion
  }

  getSearch(slug: string, params: any) {
    this.client.setToken(StoryblokToken.public)
    return this.client.get(slug, params)
  }

  get(slug: string, params?: any) {
    params = params || {}
    if (this.getQuery('_storyblok') || this.devMode || (typeof window !== 'undefined' && window.storyblok)) {
      this.token = StoryblokToken.preview
      this.client.setToken(StoryblokToken.preview)
      params.version = 'draft'
    }

    if (typeof window !== 'undefined' && typeof window.StoryblokCacheVersion !== 'undefined') {
      params.cv = window.StoryblokCacheVersion
    }
    if (this.getQuery('_storyblok_release')) {
      params.from_release = this.getQuery('_storyblok_release')
    }
    return this.client.get(slug, params)
  }

  initEditor(content: any, setContent: Function) {
    if (window.storyblok) {
      window.storyblok.init({ accessToken: this.token })
      window.storyblok.on(['change'], () => {
          console.log('change::save triggered')
          // location.reload()
        }
      )
      window.storyblok.on(['published', 'unpublished'], () => {
          console.log('published triggered')
          fetch(`${location.protocol}//${location.host}/api/clear-cache`)
            .then(() => {
              console.log('flush cashed successful triggered. ENV Vars:', StoryblokToken.preview, StoryblokToken.public)
              console.log('after flush: current token:', this.client.getToken())
              location.reload()
            })
            .catch((e) => {
              console.error('error on flush cache:', e)
            })
        }
      )
      window.storyblok.on('input', (event: any) => {
        // todo if this is still works after rewrite... maybe add one for settings as well..
        if (event.story.content._uid === content.page._uid) {
          console.log('input::input changed')
          setContent({
            ...content,
            page: event.story.content
          })
        }
      })
    }
  }

  insideVisualComposer() {
    return !!this.getQuery('_storyblok')
  }

  setQuery(query: any) {
    this.query = query
  }

  getQuery(param: any) {
    return this.query[param]
  }

  bridge() {
    if (!this.getQuery('_storyblok')) {
      return ''
    }
    return (<script src={'//app.storyblok.com/f/storyblok-latest.js?t=' + this.token}></script>)
  }
}

const storyblokInstance = new StoryblokService()

export default storyblokInstance
