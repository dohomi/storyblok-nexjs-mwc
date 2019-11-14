import StoryblokService from './utils/StoryblokService'

type OnInitialPagePropsHook = {
  overwriteDisableRobots: boolean
  slug: string
  host: string
  settingsPath: string
  seoSlug: string
}

interface AppConfigProps {
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

const CONFIG: AppConfigProps = {
  defaultLang: 'en',
  languages: ['en', 'de'],
  storyblok: {
    activatedLanguages: false,
    settingsInLangfolder: true
  },
  hooks: {}
}
CONFIG.hooks.onInitialPageProps = (_ctx: OnInitialPagePropsHook) => {
  StoryblokService.initialize({
    previewToken: process.env.STORYBLOK_PREVIEW as string,
    publicToken: process.env.STORYBLOK_PUBLIC as string
  })
  // possible to overwrite input context
  // Object.assign(ctx, { slug: ctx + '/test' })
}

export default CONFIG
