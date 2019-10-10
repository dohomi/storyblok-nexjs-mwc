import Components from 'components/index'
import React, { useEffect, useState } from 'react'
import StoryblokService from '../utils/StoryblokService'
import Head from '../components/layout/Head'
import Layout from '../components/layout/Layout'
import WindowDimensionsProvider from '../components/provider/WindowDimensionsProvider'
import DeviceDetectService from '../utils/DeviceDetectService'
import Fonts from 'fonts'
import { useRouter } from 'next/router'
import Error from '../pages/_error'
import { NextPage } from 'next'
import { GlobalStateProvider } from '../utils/state/state'
import getInitialPageProps, { AppPageProps, PageSeoProps } from '@initialData/getInitialPageProps'

const Index: NextPage<AppPageProps> = (props) => {
  const { asPath } = useRouter()
  // const asPath = ''
  let [content, setContent] = useState<AppPageProps>(props)
  const { page } = content
  const { settings, pageSeo, hasFeature, error } = props
  // let [prevPath, setPrevPath] = useState(asPath)
  // useEffect(
  //   () => {
  //     // only set if location changed
  //     if (prevPath !== asPath) {
  //       setContent(props)
  //       setPrevPath(asPath)
  //     }
  //   },
  //   [asPath]
  // )

  useEffect(
    () => {
      Fonts(settings)
      StoryblokService.initEditor(content, setContent)
      DeviceDetectService.setAppServices()
    },
    []
  )

  if (error) {
    return <Error statusCode={error.status} settings={settings} page={page} />
  }

  return (
    <>
      <Head settings={settings} pageSeo={pageSeo as PageSeoProps} />
      <WindowDimensionsProvider>
        <GlobalStateProvider>
          <Layout settings={settings} hasFeature={hasFeature} asPath={asPath}>
            {Components(page)}
          </Layout>
        </GlobalStateProvider>
      </WindowDimensionsProvider>
      <script>/* fix FF initial render */</script>
    </>
  )
}

Index.getInitialProps = getInitialPageProps

export default Index


