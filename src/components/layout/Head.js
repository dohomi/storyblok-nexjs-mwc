import NextHead from 'next/head'
import PropTypes from 'prop-types'
import NProgress from 'nprogress'
import Router from 'next/router'
import StoryblokService from '../../utils/StoryblokService'
import NextSeo from 'next-seo'
import imageService, {imageServiceNoWebp} from '../../utils/ImageService'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const iconSizes = [16, 32, 96, 192]

function mapOpenGraphImage (item) {
  if (!item.url) return
  const imgPath = (item.width || item.height) ? `${item.width || 0}x${item.height || 0}` : ''
  return Object.assign(item, {url: imageServiceNoWebp(item.url, imgPath)})

}

function parseOpenGraph (settingsOpenGraph = {}, pageOpenGraph = {}, seoMeta = {}, url = '') {
  // set some defaults of seoMeta
  const openGraph = {
    title: pageOpenGraph.title || seoMeta.title || settingsOpenGraph.title,
    description: pageOpenGraph.description || seoMeta.description || settingsOpenGraph.description,
    url: pageOpenGraph.url || url || settingsOpenGraph.url,
    type: pageOpenGraph.type || settingsOpenGraph.type,
    site_name: pageOpenGraph.site_name || settingsOpenGraph.site_name,
    locale: pageOpenGraph.locale || settingsOpenGraph.locale,
    images: []
  }
  // settings images
  if (settingsOpenGraph.images) {
    settingsOpenGraph.images.forEach(img => {
      let parsed = mapOpenGraphImage(img)
      parsed && openGraph.images.push(parsed)
    })
  }
  // page images
  if (pageOpenGraph.images) {
    pageOpenGraph.images.forEach(item => {
      let parsed = mapOpenGraphImage(item)
      parsed && openGraph.images.push(parsed)
    })
  }
  return openGraph
}

function parseTwitter (values) {
  const twitter = values
  if (twitter.card_type) {
    twitter.cardType = twitter.card_type
  }
  return twitter
}

const Head = (props) => {
  const settings = props.settings
  const pageSeo = props.pageSeo
  const favicon = settings.setup_favicon
  const seoBody = settings.seo_body || []
  const seo = {
    title: pageSeo.title || settings.seo_title || 'Website made by Lumen Media',
    description: pageSeo.description || settings.seo_description || 'Website made by Lumen Media',
    noindex: pageSeo.disableRobots || !settings.seo_robots // important to change if go live
  }
  // open graphs
  const settingsOpenGraphs = seoBody.find(i => i.component === 'seo_open_graph')
  const pageOpenGraphs = pageSeo.body.find(i => i.component === 'seo_open_graph')
  // const pageOpenGraphImages =
  if (settingsOpenGraphs) {
    seo.openGraph = parseOpenGraph(settingsOpenGraphs, pageOpenGraphs, seo, pageSeo.url)
  }
  // twitter
  const settingsTwitter = seoBody.find(i => i.component === 'seo_twitter')
  if (settingsTwitter) {
    seo.twitter = parseTwitter(settingsTwitter)
  }
  return (
    <>
      <NextSeo config={seo}/>
      <NextHead>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
              key="viewport"/>
        {favicon && iconSizes.map(size => (
          <link rel="icon" sizes={`${size}/${size}`} href={imageService(favicon, `${size}x${size}`)}
                key={`fav_${size}`}/>
        ))}
        {StoryblokService.bridge()}
      </NextHead>
    </>
  )
}

Head.propTypes = {
  settings: PropTypes.object,
  pageSeo: PropTypes.object
}

export default Head
