import { AppPageProps } from '../../typings/app'
import { useStoryblok } from '../../utils/hooks/useStoryblok'
import Error from 'next/error'
import AppProvider from '../provider/AppProvider'
import WindowDimensionsProvider from '../provider/WindowDimensionsProvider'
import AppSetupProvider from '../provider/AppSetupProvider'
import GlobalTheme from '../global-theme/GlobalTheme'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppSeo from '../layout/AppSeo'
import Layout from '../layout/Layout'
import React, { FunctionComponentFactory, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getGlobalState, setGlobalState } from '../../utils/state/state'
import hasWebpSupport from '../../utils/detectWebpSupport'
import { NotFound } from './404'


export type LmPagesIndexProps = AppPageProps & {
  ComponentRender: FunctionComponentFactory<any>
}

export function LmPagesIndex(props: LmPagesIndexProps): JSX.Element {
  const { error, locale, settings, page, ComponentRender, ...rest } = props
  const { stateSettings, statePage } = useStoryblok({ settings, page })
  const router = useRouter()
  const isFallback = router?.isFallback
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
    return <Error statusCode={error.status} settings={stateSettings} page={statePage} />
  }


  if (!stateSettings) {
    return <Error statusCode={500} settings={stateSettings} />
  }

  return (
    <AppProvider content={{ ...rest, ComponentRender }}>
      <WindowDimensionsProvider>
        <AppSetupProvider settings={stateSettings} page={statePage}>
          <GlobalTheme settings={stateSettings} rightDrawerWidth={statePage?.right_drawer_width}>
            <CssBaseline />
            <AppSeo settings={stateSettings} page={statePage} previewImage={statePage?.preview_image} />
            <Layout settings={stateSettings}>
              {statePage ? (
                <ComponentRender content={statePage} />
              ) : (
                <NotFound locale={locale}
                          statusCode={404} />
              )}
            </Layout>
          </GlobalTheme>
        </AppSetupProvider>
      </WindowDimensionsProvider>
    </AppProvider>
  )
}

