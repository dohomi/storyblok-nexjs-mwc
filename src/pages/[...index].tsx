import Components from '@components'
import React from 'react'
import Layout from '../components/layout/Layout'
import Error from '../pages/_error'
import { NextPage } from 'next'
import getInitialPageProps from '@initialData/getInitialPageProps'
import { AppPageProps, PageSeoProps } from '../utils/parsePageProperties'
import StoriesService from '../utils/StoriesService'
import AppSeo from '../components/layout/AppSeo'
import WindowDimensionsProvider from '../components/provider/WindowDimensionsProvider'
import GlobalTheme from '../components/global-theme/GlobalTheme'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useStoryblok } from '../utils/hooks/useStoryblok'
import { setAppSetup } from '../utils/state/actions'

const Index: NextPage<AppPageProps> = (props) => {
  const { settings, page, error, pageSeo } = useStoryblok(props)

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

  setAppSetup({ page, settings })
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


