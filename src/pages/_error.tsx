import React from 'react'
import Head from 'next/head'
import Components from '@components'
import Layout from '../components/layout/Layout'
import { NextPage } from 'next'
import { GlobalStoryblok, PageStoryblok } from '../typings/generated/components-schema'
import WindowDimensionsProvider from '../components/provider/WindowDimensionsProvider'
import { GlobalStateProvider } from '../utils/state/state'
import GlobalTheme from '../components/global-theme/GlobalTheme'

type ErrorComponentProps = {
  statusCode: number
  page?: PageStoryblok
  settings: GlobalStoryblok
}

const statusCodes = {
  400: 'Bad Request',
  401: 'Not Authorized | Invalid API key',
  404: 'This page could not be found',
  500: 'Internal Server Error',
  501: 'Not Implemented'
}

const Error: NextPage<ErrorComponentProps> = (props) => {
  let { statusCode, page, settings } = props
  console.log('inside of error')
  const title = (statusCodes as any)[statusCode] || 'An unexpected error has occurred'
  if (statusCode === 401) {
    console.log('error on Storyblok PREVIEW and PUBLIC token:', process.env.NODE_ENV, process.env.STORYBLOK_PREVIEW, process.env.STORYBLOK_PUBLIC)
  }
  if (!props.settings) {
    return <h3>Error Occured</h3>
  }
  return (
    <GlobalStateProvider>
      <WindowDimensionsProvider>
        <GlobalTheme settings={settings}>
          <Head>
            <title>
              {statusCode}: {title}
            </title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                  key="viewport" />
            <meta key="robots" name="robots" content="noindex" />
          </Head>
          <Layout settings={settings as GlobalStoryblok || {}}
                  hasFeature={false}
                  hasRightDrawer={false}>
            {
              page && page.pageContent && Components(page.pageContent)
            }
            {
              !page && (
                <div>
                  <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0 }' }} />
                  {statusCode ? <h1>{statusCode}</h1> : null}
                  <div>
                    <h2>{title}.</h2>
                  </div>
                </div>
              )
            }
          </Layout>
        </GlobalTheme>
      </WindowDimensionsProvider>
    </GlobalStateProvider>
  )
}

Error.getInitialProps = async ({ res, err }): Promise<ErrorComponentProps> => {
  console.log('get initial error ', err)
  const statusCode = res && res.statusCode ? res.statusCode : err ? err.statusCode : 404
  return { statusCode: statusCode as number, settings: { theme_base: 'dark', _uid: '', component: 'global' } }
}

export default Error
