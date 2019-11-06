let config
if (process.env.NODE_ENV === 'production') {
  config = require('./config_prod')
} else {
  config = require('./config_dev')
}

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


module.exports = config({
  STORYBLOK_PREVIEW: 'IQrhrTP6aL0WYgDXmersbgtt',
  STORYBLOK_PUBLIC: 'Xzl0aUdUwWqtCsD37fHMmQtt'
})
