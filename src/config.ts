import StoryblokService from './utils/StoryblokService'
import { AppConfigProps } from './utils/parsePageProperties'
import { OnInitialPagePropsHook } from '@initialData/getInitialPageProps'

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
    'publicToken': 'Xzl0aUdUwWqtCsD37fHMmQtt',
    'languages': ['en', 'de'],
    'defaultLocale': 'en'
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
    'defaultLocale': 'en',
    'suppressSlugLocale': true
  }
}

const CONFIG: AppConfigProps = {
  defaultLocale: 'en',
  languages: [],
  rootDirectory: undefined,
  previewToken: '',
  publicToken: '',
  hooks: {}
}
CONFIG.hooks.onInitialPageProps = (ctx: OnInitialPagePropsHook) => {
  const rest = projects[ctx.host]
  Object.assign(CONFIG, rest)
  StoryblokService.initialize()
}

export default CONFIG
