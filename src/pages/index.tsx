import Components from 'components'
import React, { FunctionComponent, useEffect, useState } from 'react'
import StoryblokService from '../utils/StoryblokService'
import Head from '../components/layout/Head'
import Layout from '../components/layout/Layout'
import WindowDimensionsProvider from '../components/provider/WindowDimensionsProvider'
import DeviceDetectService from '../utils/DeviceDetectService'
import Fonts from 'fonts'
import { useRouter } from 'next/router'
import Error from '../pages/_error'
import { NextPage } from 'next'
import getInitialPageProps from '@initialData/getInitialPageProps'
import { GlobalStateProvider } from '../utils/state/state'
import { AppPageProps, PageSeoProps } from '../utils/parsePageProperties'
import StoriesService from '../utils/StoriesService'

type CoreAppProps = AppPageProps & {
  asPath: string
}
const CoreIndex: FunctionComponent<CoreAppProps> = (props) => {
  const { settings, pageSeo, hasFeature, asPath, page } = props
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

const StoryblokIndex: FunctionComponent<CoreAppProps> = (props) => {
  let [content, setContent] = useState<CoreAppProps>(props)
  const { asPath } = props
  useEffect(
    () => {
      setContent(props)
    },
    [asPath]
  )

  useEffect(
    () => {
      StoryblokService.initEditor(content, setContent)
    },
    []
  )

  return <CoreIndex {...content} />
}

const Index: NextPage<AppPageProps> = (props) => {
  const { asPath, query } = useRouter()
  const { settings, page, error } = props
  StoriesService.setAllStories(props.allStories)
  useEffect(
    () => {
      Fonts(settings)
      DeviceDetectService.setAppServices()
    },
    []
  )

  if (error) {
    return <Error statusCode={error.status} settings={settings} page={page} />
  }

  if (query._storyblok) {
    return <StoryblokIndex {...props} asPath={asPath} />
  }
  return <CoreIndex {...props} asPath={asPath} />
}

Index.getInitialProps = getInitialPageProps

export default Index


