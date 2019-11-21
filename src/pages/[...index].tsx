import Components from '@components'
import React, { FunctionComponent, useEffect, useState } from 'react'
import StoryblokService from '../utils/StoryblokService'
import Layout from '../components/layout/Layout'
import { useRouter } from 'next/router'
import Error from '../pages/_error'
import { NextPage } from 'next'
import getInitialPageProps from '@initialData/getInitialPageProps'
import { AppPageProps, PageSeoProps } from '../utils/parsePageProperties'
import StoriesService from '../utils/StoriesService'
import Head from '../components/layout/Head'
import { closeNavigationDrawers } from '../utils/state/actions'
import WindowDimensionsProvider from '../components/provider/WindowDimensionsProvider'
import GlobalTheme from '../components/global-theme/GlobalTheme'
import CssBaseline from '@material-ui/core/CssBaseline'
import { GlobalStateProvider } from '../utils/state/state'

type CoreAppProps = AppPageProps & {
  asPath: string
}

const CoreIndex: FunctionComponent<CoreAppProps> = (props) => {
  const { settings, pageSeo, asPath, page } = props
  useEffect(
    () => {
      closeNavigationDrawers() // todo needs testing might need a pure close drawer action
    },
    [asPath]
  )
  return (
    <GlobalStateProvider>
      <WindowDimensionsProvider>
        <GlobalTheme settings={settings}>
          <CssBaseline />
          <Head settings={settings} pageSeo={pageSeo as PageSeoProps} previewImage={page && page.preview_image} />
          <Layout hasFeature={!!(page.property && page.property.includes('has_feature'))}
                  settings={settings}
                  hasRightDrawer={!!(page.right_body && page.right_body.length)}
          >
            {Components(page)}
          </Layout>
        </GlobalTheme>
      </WindowDimensionsProvider>
    </GlobalStateProvider>
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
  StoriesService.setConfig(props.config)
  StoryblokService.initialize(props.config)
  StoriesService.setAllStories(props.allStories)
  StoriesService.setAllCategories(props.allCategories)
  StoriesService.setLocale(props.locale)
  if (error) {
    if (error.type === 'not_supported') {
      return null
    }
    return <Error statusCode={error.status} settings={settings} page={page} />
  }

  if (!page && !settings) {
    return <h3>No page or settings found</h3>
  }

  if (!page) {
    return <Error statusCode={404} settings={settings} page={page} />
  }
  console.log('inside of INDEX')

  if (query._storyblok) {
    return <StoryblokIndex {...props} asPath={asPath} />
  }
  return <CoreIndex {...props} asPath={asPath} />
}

Index.getInitialProps = getInitialPageProps

export default Index


