import NextHead from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'
import StoryblokService from '../../utils/StoryblokService'
import { NextSeo } from 'next-seo'
import imageService, { getOriginalImageDimensions, imageServiceNoWebp } from '../../utils/ImageService'
import { FunctionComponent } from 'react'
import {
  GlobalStoryblok,
  ImageCoreStoryblok,
  SeoOpenGraphStoryblok,
  SeoTwitterStoryblok
} from '../../typings/generated/components-schema'
import { PageSeoProps } from '@initialData/getInitialPageProps'
import { OpenGraph, OpenGraphImages, Twitter } from 'next-seo/lib/types'

Router.events.on('onRouteChangeStart', () => NProgress.start())
Router.events.on('onRouteChangeComplete', () => NProgress.done())
Router.events.on('onRouteChangeError', () => NProgress.done())

const iconSizes = [16, 32, 96, 192]

type SeoMetaTypes = {
  title: string
  description: string
  noindex: boolean
  openGraph?: OpenGraph
  facebook?: {
    appId: string;
  }
  twitter?: Twitter
}


const mapOpenGraphImage = (item: ImageCoreStoryblok): OpenGraphImages | undefined => {
  if (!item.url) return
  let dimensions = getOriginalImageDimensions(item.url)
  const imgPath = (item.width || item.height) ? `${item.width || 0}x${item.height || 0}` : ''
  if (item.width || item.height) {
    // delete both original dimensions
    delete dimensions.width
    delete dimensions.height
    item.width && (dimensions.width = item.width)
    item.height && (dimensions.height = item.height)
  }
  return {
    ...dimensions,
    alt: item.alt,
    url: imageServiceNoWebp(item.url, imgPath)
  }
}

const parseOpenGraph = (settingsOpenGraph: SeoOpenGraphStoryblok, pageOpenGraph: SeoOpenGraphStoryblok, seoMeta: SeoMetaTypes, url: string): OpenGraph => {
  // set some defaults of seoMeta
  const openGraph: OpenGraph = {
    title: pageOpenGraph.title || seoMeta.title || settingsOpenGraph.title,
    description: pageOpenGraph.description || seoMeta.description || settingsOpenGraph.description,
    url: pageOpenGraph.url || url || settingsOpenGraph.url,
    type: pageOpenGraph.type || settingsOpenGraph.type,
    site_name: pageOpenGraph.site_name || settingsOpenGraph.site_name,
    locale: pageOpenGraph.locale || settingsOpenGraph.locale
  }
  const images: OpenGraphImages[] = []
  // settings images
  if (settingsOpenGraph.images) {
    settingsOpenGraph.images.forEach((img: ImageCoreStoryblok) => {
      let parsed = mapOpenGraphImage(img)
      parsed && images.push(parsed)
    })
  }
  // page images
  if (pageOpenGraph.images) {
    pageOpenGraph.images.forEach((item: ImageCoreStoryblok) => {
      let parsed = mapOpenGraphImage(item)
      parsed && images.push(parsed)
    })
  }
  openGraph.images = images
  return openGraph
}

const parseTwitter = (values): Twitter => {
  const twitter = values
  if (twitter.card_type) {
    twitter.cardType = twitter.card_type
  }
  return twitter
}


const Head: FunctionComponent<{ settings: GlobalStoryblok, pageSeo: PageSeoProps }> = ({ settings, pageSeo }) => {
  const favicon = settings.setup_favicon
  const seoBody: (SeoTwitterStoryblok | SeoOpenGraphStoryblok)[] = settings.seo_body || []
  const pageSeoBody: (SeoTwitterStoryblok | SeoOpenGraphStoryblok)[] = pageSeo.body || []
  const seo: SeoMetaTypes = {
    title: pageSeo.title || settings.seo_title || 'Website made by Lumen Media',
    description: pageSeo.description || settings.seo_description || 'Website made by Lumen Media',
    noindex: pageSeo.disableRobots || !settings.seo_robots // important to change if go live
  }
  // open graphs
  const settingsOpenGraphs: SeoOpenGraphStoryblok = seoBody.find(i => i.component === 'seo_open_graph') as SeoOpenGraphStoryblok
  const pageOpenGraphs: SeoOpenGraphStoryblok = pageSeoBody.find(i => i.component === 'seo_open_graph') as SeoOpenGraphStoryblok
  if (settingsOpenGraphs || pageOpenGraphs) {
    seo.openGraph = parseOpenGraph(settingsOpenGraphs || {}, pageOpenGraphs || {}, seo, pageSeo.url)
    const facebookAppId = settingsOpenGraphs.app_id || pageOpenGraphs && pageOpenGraphs.app_id
    facebookAppId && (seo.facebook = { appId: facebookAppId })
  }
  // twitter
  const settingsTwitter = seoBody.find(i => i.component === 'seo_twitter')
  if (settingsTwitter) {
    seo.twitter = parseTwitter(settingsTwitter)
  }
  return (
    <>
      <NextSeo {...seo} />
      <NextHead>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
              key="viewport" />
        {favicon && iconSizes.map(size => (
          <link rel="icon" sizes={`${size}/${size}`} href={imageService(favicon, `${size}x${size}`)}
                key={`fav_${size}`} />
        ))}
        {StoryblokService.bridge()}
      </NextHead>
    </>
  )
}

export default Head
