const config = require('./nextjs_dev_config')

// UPC:
// STORYBLOK_PREVIEW: 'h4irkhjH5C5djHiI8f76rQtt',
// STORYBLOK_PUBLIC: 'rngGl9hhQWVCizcr1WRDJQtt'

// Fussballbuch:
// STORYBLOK_PREVIEW: 'tE20umOzBgUMTraCOXpUIAtt',
// STORYBLOK_PUBLIC: '5Ikr8NfLTsgB47fUZmbmRwtt'

// Mc Laurin:
// STORYBLOK_PREVIEW: '9zRJpw6MGovargzcXIrMjQtt',
// STORYBLOK_PUBLIC: 'mlJ9NJ301Jlk0lacBBSqCAtt'

// jung_texte
// STORYBLOK_PREVIEW: 'nki3pcCyJQn4Gz4YVPtQDAtt',
// STORYBLOK_PUBLIC: 'LUjyqrMPcBd3M9aWJHfNCQtt'

// Baliinternships
// STORYBLOK_PREVIEW: 'IQrhrTP6aL0WYgDXmersbgtt',
// STORYBLOK_PUBLIC: 'Xzl0aUdUwWqtCsD37fHMmQtt'

//playground
// STORYBLOK_PREVIEW: 'Phi41Cyvru21eG5krXrfEgtt'
// STORYBLOK_PUBLIC:'UNJB9nAEyxrldv4hXwO61Att'


//upskill
// STORYBLOK_PREVIEW: 'frxOrvW4RwWV5Xcrg4b3awtt'
// STORYBLOK_PUBLIC:'g2AKoarFAJ3BRbUkuafWwQtt'

// mike
// STORYBLOK_PREVIEW: 'UvABqQAdrEMCeCG2N0wePQtt',
//   STORYBLOK_PUBLIC: 'PhCU8L1FyvZlsW2H522WRQtt'


// studentsgoabroad.com
module.exports = config({
  previewToken: process.env.previewToken || 'IQrhrTP6aL0WYgDXmersbgtt',
  publicToken: process.env.publicToken || 'Xzl0aUdUwWqtCsD37fHMmQtt',
//   previewToken: process.env.previewToken || 'aPQruoQG3ZLTMdWUZQfG3gtt',
//   publicToken: process.env.publicToken || 'rDHPUnIN5mmSuPWL7S3lGgtt',
//   languages: process.env.languages,
  languages: process.env.languages || 'en,de',
  defaultLocale: process.env.defaultLocale || 'en',
  // defaultLocale: process.env.defaultLocale,
  //  rootDirectory: process.env.rootDirectory || 'de',
  rootDirectory: process.env.rootDirectory,
  overwriteLocale: process.env.overwriteLocale,
  // overwriteLocale: process.env.overwriteLocale || 'de',
  suppressSlugLocale: process.env.suppressSlugLocale,
  TAWKTO: '5923d96d8028bb732704747b'
})
