import Components from 'components/index'
import React, { useEffect, useState } from 'react'
import StoryblokService from '../../utils/StoryblokService'
import Head from '../layout/Head'
import Layout from '../layout/Layout'
import WindowDimensionsProvider from '../provider/WindowDimensionsProvider'
import DeviceDetectService from '../../utils/DeviceDetectService'
import Fonts from 'fonts'
import { useRouter } from 'next/dist/client/router'
import Error from '../../pages/_error'
import { NextPage } from 'next'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'

export type AppInitialProps = {
  settings: GlobalStoryblok
  page: PageStoryblok,
  overwriteDisableRobots: boolean
  url: string
  error?: any
}
type AppPageProps = AppInitialProps

const Index: NextPage = (props: AppPageProps) => {
  const settings = props.settings
  const { asPath } = useRouter()
  let [content, setContent] = useState(mapStateProps(props))
  let [prevPath, setPrevPath] = useState(asPath)
  useEffect(
    () => {
      // only set if location changed
      if (prevPath !== asPath) {
        setContent(mapStateProps(props))
        setPrevPath(asPath)
      }
    },
    [asPath]
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
    return <Error statusCode={props.error.status} settings={settings} page={content} />
  }

  return (
    <>
      <Head settings={settings} pageSeo={content.pageSeo} />
      <WindowDimensionsProvider>
        <Layout settings={settings} hasFeature={content.hasFeature} asPath={asPath}>
          {Components(content.pageContent)}
        </Layout>
      </WindowDimensionsProvider>
      <script>/* fix FF initial render */</script>
    </>
  )
}

export default Index

function mapStateProps(pageProps: AppPageProps) {
  const pageContent = pageProps.page
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
