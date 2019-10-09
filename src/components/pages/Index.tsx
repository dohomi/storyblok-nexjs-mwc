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
import { GlobalStateProvider } from '../../utils/state/state'
import mapStateProps, { AppPageProps } from '../../utils/parsePageProperties'


const Index: NextPage<AppPageProps> = (props) => {
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
        <GlobalStateProvider>
          <Layout settings={settings} hasFeature={content.hasFeature} asPath={asPath}>
            {Components(content.pageContent)}
          </Layout>
        </GlobalStateProvider>
      </WindowDimensionsProvider>
      <script>/* fix FF initial render */</script>
    </>
  )
}

export default Index


