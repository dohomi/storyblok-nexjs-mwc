import NextHead from 'next/head'
import {string} from 'prop-types'
import NProgress from 'nprogress'
import Router from 'next/router'
import StoryblokService from '../../utils/StoryblokService'
import NextSeo from 'next-seo'
import imageService from '../../utils/ImageService'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const iconSizes = [16, 32, 96, 192]

// <link rel="apple-touch-icon" href="/static/touch-icon.png"/>
// <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882"/>

const Head = (props) => {
  const settings = props.settings
  const pageSeo = props.pageSeo
  const favicon = settings.setup_favicon

  const seo = {
    title: pageSeo.title || settings.seo_title || 'Website made by Lumen Media',
    description: pageSeo.description || settings.seo_description || 'Website made by Lumen Media',
    noindex: pageSeo.disableRobots || !settings.seo_robots // important to change if go live
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
