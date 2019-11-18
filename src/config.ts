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
  },
  'localhost:3002': {
    'previewToken': 'IQrhrTP6aL0WYgDXmersbgtt',
    'publicToken': 'Xzl0aUdUwWqtCsD37fHMmQtt'
  },
  'localhost:3003': {
    'previewToken': 'qASJXPT2cwH76pA9vpJbxAtt',
    'publicToken': 'm85LRUo0sX4yo9Q96VMQlQtt'
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
    rootDirectory: rootDirectory ? rootDirectory : ''
  })
}

export default CONFIG
