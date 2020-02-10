import Components from '@components'
import React, { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import { useRouter } from 'next/router'
import Error from '../pages/_error'
import { NextPage } from 'next'
import getInitialPageProps from '@initialData/getInitialPageProps'
import { AppPageProps, PageSeoProps } from '../utils/parsePageProperties'
import StoriesService from '../utils/StoriesService'
import AppSeo from '../components/layout/AppSeo'
import { closeNavigationDrawers } from '../utils/state/actions'
import WindowDimensionsProvider from '../components/provider/WindowDimensionsProvider'
import GlobalTheme from '../components/global-theme/GlobalTheme'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useStoryblok } from '../utils/hooks/useStoryblok'

const Index: NextPage<AppPageProps> = (props) => {
  const { settings, page, error, pageSeo } = useStoryblok(props)
  const { asPath } = useRouter()

  useEffect(
    () => {
      closeNavigationDrawers() // todo needs testing might need a pure close drawer action
    },
    [asPath]
  )

  StoriesService.setAllStories(props.allStories)
  StoriesService.setAllCategories(props.allCategories)
  StoriesService.setAllStaticContent(props.allStaticContent)
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

  return (
      <WindowDimensionsProvider>
        <GlobalTheme settings={settings}>
          <CssBaseline />
          <AppSeo settings={settings} pageSeo={pageSeo as PageSeoProps} previewImage={page && page.preview_image} />
          <Layout hasFeature={!!(page.property && page.property.includes('has_feature'))}
                  settings={settings}
                  hasRightDrawer={!!(page.right_body && page.right_body.length)}
          >
            {Components(page)}
          </Layout>
        </GlobalTheme>
      </WindowDimensionsProvider>
  )
}

Index.getInitialProps = getInitialPageProps

export default Index


