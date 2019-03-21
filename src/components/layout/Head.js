import NextHead from 'next/head'
import {string} from 'prop-types'
import NProgress from 'nprogress'
import Router from 'next/router'
import StoryblokService from '../../utils/StoryblokService'
import NextSeo from 'next-seo'
import imageService, {imageServiceNoWebp} from '../../utils/ImageService'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const iconSizes = [16, 32, 96, 192]

function parseOpenGraph (values) {
  const openGraph = values
  if (openGraph.images) {
    openGraph.images = openGraph.images.map(item => {
      if (!item.url) return
      const imgPath = (item.width || item.height) ? `${item.width || 0}x${item.height || 0}` : ''
      return Object.assign(item, {url: imageServiceNoWebp(item.url, imgPath)})
    }).filter(i => i)
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
  let openGraph = {}
  if (settingsOpenGraphs) {
    seo.openGraph = parseOpenGraph(settingsOpenGraphs)
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
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head
