import StoryblokService from './utils/StoryblokService'

export type OnInitialPagePropsHook = {
  overwriteDisableRobots: boolean
  slug: string
  host: string
  settingsPath: string
  seoSlug: string
  rootDirectory: string
  categories: string
}

export interface AppConfigProps {
  defaultLang: string
  languages: string[]
  storyblok: {
    activatedLanguages: boolean
    settingsInLangfolder: boolean
  }
  hooks: {
    onInitialPageProps?: Function
  }
}

const projects = {
  'localhost:3000': {
    'previewToken': 'UvABqQAdrEMCeCG2N0wePQtt',
    'publicToken': 'PhCU8L1FyvZlsW2H522WRQtt',
    'rootDirectory': ''
  },
  'localhost:3001': {
    'previewToken': 'UvABqQAdrEMCeCG2N0wePQtt',
    'publicToken': 'PhCU8L1FyvZlsW2H522WRQtt',
    'rootDirectory': 'etherhill/'
  }
}

const CONFIG: AppConfigProps = {
  defaultLang: 'en',
  languages: ['en', 'de'],
  storyblok: {
    activatedLanguages: false,
    settingsInLangfolder: true
  },
  hooks: {}
}
CONFIG.hooks.onInitialPageProps = (ctx: OnInitialPagePropsHook) => {
  const { previewToken, publicToken, rootDirectory } = projects[ctx.host]

  StoryblokService.initialize({
    previewToken,
    publicToken
  })
  // possible to overwrite input context
  // Object.assign(ctx, { slug: ctx + '/test' })
  Object.assign(ctx, {
    rootDirectory
  })
}

export default CONFIG
