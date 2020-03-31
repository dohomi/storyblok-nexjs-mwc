import { NextPage } from 'next'
import { AppPageProps } from '../../utils/parsePageProperties'
import { useStoryblok } from '../../utils/hooks/useStoryblok'
import { getGlobalState, setGlobalState } from '../../utils/state/state'
import Error from '../../pages/_error'
import AppProvider from '../provider/AppProvider'
import WindowDimensionsProvider from '../provider/WindowDimensionsProvider'
import AppSetupProvider from '../provider/AppSetupProvider'
import GlobalTheme from '../global-theme/GlobalTheme'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppSeo from '../layout/AppSeo'
import Layout from '../layout/Layout'
import Components from '@components'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import hasWebpSupport from '../../utils/detectWebpSupport'

const Index: NextPage<AppPageProps> = (props) => {
  const { settings, page, error } = useStoryblok(props)
  const { isFallback } = useRouter()
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  useEffect(
    () => {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles && jssStyles.parentElement) {
        jssStyles.parentElement.removeChild(jssStyles)
      }
    },
    []
  )

  if (isFallback) {
    return <div>Loading...</div>
  }

  if (props.locale && getGlobalState('locale') !== props.locale) {
    setGlobalState('locale', props.locale)
  }
  if (typeof getGlobalState('hasWebpSupport') === 'undefined') {
    hasWebpSupport()
      .then((has) => setGlobalState('hasWebpSupport', has))
  }

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

  return (
    <AppProvider content={{
      allCategories: props.allCategories,
      allStaticContent: props.allStaticContent,
      allStories: props.allStories
    }}>
      <WindowDimensionsProvider>
        <AppSetupProvider settings={settings} page={page}>
          <GlobalTheme settings={settings}>
            <CssBaseline />
            <AppSeo settings={settings} page={page} previewImage={page && page.preview_image} />
            <Layout settings={settings}>
              {Components(page)}
            </Layout>
          </GlobalTheme>
        </AppSetupProvider>
      </WindowDimensionsProvider>
    </AppProvider>
  )
}

export default Index
