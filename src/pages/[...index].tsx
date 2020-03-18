import Components from '@components'
import React from 'react'
import Layout from '../components/layout/Layout'
import Error from '../pages/_error'
import { NextPage } from 'next'
import getInitialPageProps from '@initialData/getInitialPageProps'
import { AppPageProps, PageSeoProps } from '../utils/parsePageProperties'
import AppSeo from '../components/layout/AppSeo'
import WindowDimensionsProvider from '../components/provider/WindowDimensionsProvider'
import GlobalTheme from '../components/global-theme/GlobalTheme'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useStoryblok } from '../utils/hooks/useStoryblok'
import { getGlobalState, setGlobalState } from '../utils/state/state'
import AppProvider from '../components/provider/AppProvider'
import AppSetupProvider from '../components/provider/AppSetupProvider'


const Index: NextPage<AppPageProps> = (props) => {
  const { settings, page, error, pageSeo } = useStoryblok(props)

  if (props.locale && getGlobalState('locale') !== props.locale) {
    setGlobalState('locale', props.locale)
  }
  if (props.hasWebpSupport !== getGlobalState('hasWebpSupport')) {
    setGlobalState('hasWebpSupport', props.hasWebpSupport)
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
      <WindowDimensionsProvider device={props.device}>
        <AppSetupProvider settings={settings} page={page}>
          <GlobalTheme settings={settings} device={props.device}>
            <CssBaseline />
            <AppSeo settings={settings} pageSeo={pageSeo as PageSeoProps} previewImage={page && page.preview_image} />
            <Layout settings={settings}>
              {Components(page)}
            </Layout>
          </GlobalTheme>
        </AppSetupProvider>
      </WindowDimensionsProvider>
    </AppProvider>
  )
}

Index.getInitialProps = getInitialPageProps

export default Index


