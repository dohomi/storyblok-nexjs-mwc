import { NextSeo } from 'next-seo'
import { getOriginalImageDimensions, imageServiceNoWebp } from '../../utils/ImageService'
import * as React from 'react'
import { FunctionComponent } from 'react'
import {
  GlobalStoryblok,
  ImageCoreStoryblok,
  SeoOpenGraphStoryblok,
  SeoTwitterStoryblok
} from '../../typings/generated/components-schema'
import { OpenGraph, OpenGraphImages, Twitter } from 'next-seo/lib/types'
import { PageSeoProps } from '../../utils/parsePageProperties'

type SeoMetaTypes = {
  title: string
  description: string
  noindex: boolean
  nofollow: boolean
  openGraph?: OpenGraph
  facebook?: {
    appId: string;
  }
  twitter?: Twitter
  canonical?: string
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
    url: pageOpenGraph.url || settingsOpenGraph.url || url,
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

const parseTwitter = (values: SeoTwitterStoryblok): Twitter => {
  const twitter = values
  if (twitter.card_type) {
    twitter.cardType = twitter.card_type
    delete twitter.card_type // remove wrong string
  }
  return twitter
}

const getCanonicalUrl = (url: string) => {
  if (url.endsWith('home')) {
    url = url.replace('home', '')
  }
  return url
}


const AppSeo: FunctionComponent<{ settings: GlobalStoryblok, pageSeo: PageSeoProps, previewImage?: string }> = ({ settings, pageSeo, previewImage }) => {
  const seoBody: (SeoTwitterStoryblok | SeoOpenGraphStoryblok)[] = settings.seo_body || []
  const pageSeoBody: (SeoTwitterStoryblok | SeoOpenGraphStoryblok)[] = pageSeo.body || []
  const robotsIndexFollow = pageSeo.disableRobots || !settings.seo_robots
  const seo: SeoMetaTypes = {
    title: pageSeo.title || settings.seo_title || 'Website made by Lumen Media',
    description: pageSeo.description || settings.seo_description || 'Website made by Lumen Media',
    noindex: robotsIndexFollow, // important to change if go live
    nofollow: robotsIndexFollow
  }

  // open graphs
  const settingsOpenGraphs: SeoOpenGraphStoryblok = seoBody.find(i => i.component === 'seo_open_graph') as SeoOpenGraphStoryblok
  const pageOpenGraphs: SeoOpenGraphStoryblok = pageSeoBody.find(i => i.component === 'seo_open_graph') as SeoOpenGraphStoryblok || {}
  if (previewImage) {
    pageOpenGraphs.images = pageOpenGraphs.images || []
    pageOpenGraphs.images.push({ url: previewImage })
  }
  if (settingsOpenGraphs || pageOpenGraphs) {
    seo.openGraph = parseOpenGraph(settingsOpenGraphs || {}, pageOpenGraphs, seo, pageSeo.url)
    const facebookAppId = (settingsOpenGraphs && settingsOpenGraphs.app_id) || (pageOpenGraphs && pageOpenGraphs.app_id)
    facebookAppId && (seo.facebook = { appId: facebookAppId })
  }

  // twitter
  const settingsTwitter: SeoTwitterStoryblok = seoBody.find(i => i.component === 'seo_twitter') as SeoTwitterStoryblok || undefined
  if (settingsTwitter) {
    seo.twitter = parseTwitter(settingsTwitter)
  }

  seo.canonical = getCanonicalUrl(pageSeo.url)

  return <NextSeo {...seo} />
}

export default AppSeo