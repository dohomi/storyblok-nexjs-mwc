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
  rootDirectory?: string
  overwriteLocale?: string
  suppressLangKey?: boolean
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
    'previewToken': 'IQrhrTP6aL0WYgDXmersbgtt', // bi
    'publicToken': 'Xzl0aUdUwWqtCsD37fHMmQtt'
  },
  'localhost:3003': {
    'previewToken': 'qASJXPT2cwH76pA9vpJbxAtt', // students
    'publicToken': 'm85LRUo0sX4yo9Q96VMQlQtt',
    'rootDirectory': 'en',
    'overwriteLocale': 'en'
  },
  'localhost:3004': {
    'previewToken': 'frxOrvW4RwWV5Xcrg4b3awtt', // upskill
    'publicToken': 'g2AKoarFAJ3BRbUkuafWwQtt',
    'languages': ['en', 'de'],
    'defaultLanguage': 'en',
    'suppressLangKey': true
  }
}

const CONFIG: AppConfigProps = {
  defaultLang: 'en',
  languages: ['en', 'de'],
  rootDirectory: undefined,
  storyblok: {
    activatedLanguages: false,
    settingsInLangfolder: true
  },
  hooks: {}
}
CONFIG.hooks.onInitialPageProps = (ctx: OnInitialPagePropsHook) => {
  const { previewToken, publicToken, ...rest } = projects[ctx.host]

  StoryblokService.initialize({
    previewToken,
    publicToken
  })
  // possible to overwrite input context
  // Object.assign(ctx, { slug: ctx + '/test' })

  Object.assign(CONFIG, rest)

}

export default CONFIG
