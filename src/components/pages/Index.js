import Components from 'components/index'
import React, {useState, useEffect} from 'react'
import StoryblokService from '../../utils/StoryblokService'
import Head from '../../components/layout/Head'
import Layout from '../../components/layout/Layout'
import WindowDimensionsProvider from '../../components/provider/WindowDimensionsProvider'
import DeviceDetectService from '../../utils/DeviceDetectService'
import Fonts from 'fonts'
import {withRouter} from 'next/dist/client/router'
import Error from '../../pages/_error'

/**
 *
 * @param overwriteDisableRobots
 * @param page
 * @param url
 * @return {{pageSeo: {description: *, disableRobots: (filter_query.meta_robots|{not_in}), title: *, body: (*|Array), url: *}, hasFeature: boolean, pageContent: *}}
 */
function mapStateProps ({overwriteDisableRobots = false, page = {}, url = ''}) {
  const pageContent = page
  const pageSeo = {
    title: pageContent.meta_title,
    description: pageContent.meta_description,
    disableRobots: pageContent.meta_robots,
    body: pageContent.seo_body || [],
    url
  }
  if (overwriteDisableRobots) {
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
  const settings = props.settings
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
      Fonts(settings)
      StoryblokService.initEditor(content, setContent)
      DeviceDetectService.setAppServices()
    },
    []
  )

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
      <script>/* fix FF initial render */</script>
    </>
  )
}

export default withRouter(Index)
