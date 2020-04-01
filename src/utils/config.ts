type AppConfigProps = {
  defaultLocale: string
  publicToken: string
  previewToken: string
  languages: string[]
  rootDirectory?: string
  overwriteLocale?: string
  suppressSlugLocale?: boolean
  suppressSlugIncludeDefault?: boolean
  overwriteDisableIndex?: boolean
  sitemapIgnorePath?: string
  GA?: string
  TAWKTO?: string
  prefetch: boolean
}

export const CONFIG: AppConfigProps = {
  previewToken: process.env.previewToken || '',
  publicToken: process.env.publicToken || '',
  languages: (process.env.languages && process.env.languages.split(',')) || [],
  defaultLocale: process.env.defaultLocale || 'en',
  rootDirectory: process.env.rootDirectory,
  overwriteLocale: process.env.overwriteLocale,
  suppressSlugLocale: !!process.env.suppressSlugLocale,
  overwriteDisableIndex: !!process.env.overwriteDisableIndex,
  sitemapIgnorePath: process.env.sitemapIgnorePath,
  GA: process.env.GA,
  TAWKTO: process.env.TAWKTO,
  prefetch: !process.env.disablePrefetch
}
