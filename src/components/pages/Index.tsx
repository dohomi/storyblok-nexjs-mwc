import { NextPage } from 'next'
import { AppPageProps } from '../../typings/app'
import { useStoryblok } from '../../utils/hooks/useStoryblok'
// import Error from '../../../pages/_error' @todo
import Error from 'next/error'
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
import { getGlobalState, setGlobalState } from '../../utils/state/state'
import hasWebpSupport from '../../utils/detectWebpSupport'


export type LmPagesIndexProps = NextPage<AppPageProps>

const Index: LmPagesIndexProps = (props) => {
  const { error, locale, settings, page, ...rest } = props
  const { stateSettings, statePage } = useStoryblok({ settings, page })
  const { isFallback } = useRouter()

  if (locale && getGlobalState('locale') !== locale) {
    setGlobalState('locale', locale)
  }
  if (typeof getGlobalState('hasWebpSupport') === 'undefined') {
    hasWebpSupport()
      .then((has) => setGlobalState('hasWebpSupport', has))
  }
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


  if (error) {
    if (error.type === 'not_supported') {
      return null
    }
    return <Error statusCode={error.status} settings={stateSettings} page={statePage} />
  }

  if (!statePage && !stateSettings) {
    return <h3>No page or settings found</h3>
  }

  if (!statePage) {
    return <Error statusCode={404} settings={stateSettings} page={statePage} />
  }

  if (!stateSettings) {
    return <Error statusCode={404} settings={stateSettings} page={statePage} />
  }

  return (
    <AppProvider content={rest}>
      <WindowDimensionsProvider>
        <AppSetupProvider settings={stateSettings} page={statePage}>
          <GlobalTheme settings={stateSettings} rightDrawerWidth={statePage?.right_drawer_width}>
            <CssBaseline />
            <AppSeo settings={stateSettings} page={statePage} previewImage={statePage?.preview_image} />
            <Layout settings={stateSettings}>
              <Components {...statePage} />
            </Layout>
          </GlobalTheme>
        </AppSetupProvider>
      </WindowDimensionsProvider>
    </AppProvider>
  )
}

export default Index
