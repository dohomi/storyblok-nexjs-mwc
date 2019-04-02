import Components from 'components/index'
import React, {useState, useEffect} from 'react'
import StoryblokService from '../../utils/StoryblokService'
import Head from '../../components/layout/Head'
import Layout from '../../components/layout/Layout'
import WindowDimensionsProvider from '../../components/provider/WindowDimensionsProvider'
import DeviceDetectService from '../../utils/DeviceDetectService'
import Fonts from '../../utils/Fonts'
import {withRouter} from 'next/dist/client/router'
import Error from '../../pages/_error'

function mapStateProps (pageProps) {
  const pageContent = pageProps.page && pageProps.page.data && pageProps.page.data.story && pageProps.page.data.story.content || {}
  const pageSeo = {
    title: pageContent.meta_title,
    description: pageContent.meta_description,
    disableRobots: pageContent.meta_robots,
    body: pageContent.seo_body || [],
    url: pageProps.url
  }
  if (pageProps.overwriteDisableRobots) {
    pageSeo.disableRobots = true
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
  let [prevPath, setPrevPath] = useState(props.router.asPath)
  useEffect(
    () => {
      // only set if location changed
      if (prevPath !== props.router.asPath) {
        setContent(mapStateProps(props))
        setPrevPath(props.router.asPath)
      }
    },
    [props.router.asPath]
  )

  useEffect(
    () => {
      Fonts()
      StoryblokService.initEditor(content, setContent)
      DeviceDetectService.setAppServices()
    },
    []
  )

  const settings = props.settings && props.settings.data && props.settings.data.story && props.settings.data.story.content || {}
  if (props.error) {
    return <Error statusCode={props.error.status} settings={settings} page={content}/>
  }

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

export default withRouter(Index)
