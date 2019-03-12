import Components from 'components/index'
import React, {useState, useEffect} from 'react'
import {withRouter} from 'next/router'
import StoryblokService from '../utils/StoryblokService'
import WebpService from '../utils/WebpService'
import Head from '../components/layout/Head'
import Layout from '../components/layout/Layout'
import WindowDimensionsProvider from '../components/provider/WindowDimensionsProvider'
import DeviceDetectService from '../utils/DeviceDetectService'

function mapStateProps (pageProps) {
  const pageContent = pageProps.page && pageProps.page.data && pageProps.page.data.story && pageProps.page.data.story.content || {}
  const pageSeo = {
    title: pageContent.meta_title,
    description: pageContent.meta_description,
    disableRobots: pageContent.meta_robots
  }
  const properties = pageContent.property || []
  const hasFeature = properties.includes('has_feature')
  return {
    pageContent,
    hasFeature,
    pageSeo
  }
}

const Index = (props) => {
  let [content, setContent] = useState(mapStateProps(props))

  useEffect(() => {
    setContent(mapStateProps(props))
  }, [props.router.asPath])

  useEffect(() => {
    StoryblokService.initEditor(content, setContent)
  }, [])

  const settings = props.settings && props.settings.data && props.settings.data.story && props.settings.data.story.content || {}
  return (
    <>
      <Head settings={settings} pageSeo={content.pageSeo}/>
      <WindowDimensionsProvider>
        <Layout settings={settings} hasFeature={content.hasFeature}>
          {Components(content.pageContent)}
        </Layout>
      </WindowDimensionsProvider>
    </>
  )
}

Index.getInitialProps = async (context) => {
  const query = context.query
  DeviceDetectService.setDevice(context.req) // important to call first, webp is depending on this
  StoryblokService.setQuery(query)
  WebpService.setWebpSupport(context.req) // move this to _app?
  let slug = query.slug || 'home'
  if (slug.match(/^.*\.[^\\]+$/)) {
    return {}
  }
  try {
    let [page, settings] = await Promise.all([
      StoryblokService.get(`cdn/stories/${slug}`),
      StoryblokService.get(`cdn/stories/settings`)
    ])

    return {
      page,
      settings
    }
  } catch (e) {
    console.error(e)
  }
  return {}
}


export default withRouter(Index)
