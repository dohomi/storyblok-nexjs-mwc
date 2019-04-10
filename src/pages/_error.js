import React from 'react'
import Head from 'next-server/head'
import Components from '../../components'
import WindowDimensionsProvider from '../components/provider/WindowDimensionsProvider'
import Layout from '../components/layout/Layout'

const statusCodes = {
  400: 'Bad Request',
  401: 'Not Authorized | Invalid API key',
  404: 'This page could not be found',
  500: 'Internal Server Error',
  501: 'Not Implemented'
}

const Error = (props) => {
  let {statusCode, page, settings} = props
  const title = statusCodes[statusCode] || 'An unexpected error has occurred'
  if (statusCode === 401) {
    console.log('error on Storyblok PREVIEW and PUBLIC token:', process.env.NODE_ENV, process.env.STORYBLOK_PREVIEW, process.env.STORYBLOK_PUBLIC)
  }
  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
              key="viewport"/>
        <meta key="robots" name="robots" content="noindex"/>
      </Head>
      <WindowDimensionsProvider>
        <Layout settings={settings}>
          {
            page && page.pageContent && Components(page.pageContent)
          }
          {
            !page && (
              <div>
                <style dangerouslySetInnerHTML={{__html: 'body { margin: 0 }'}}/>
                {statusCode ? <h1>{statusCode}</h1> : null}
                <div>
                  <h2>{title}.</h2>
                </div>
              </div>
            )
          }
        </Layout>
      </WindowDimensionsProvider>
    </>
  )
}

Error.getInitialProps = async ({res, err}) => {
  const statusCode = res && res.statusCode ? res.statusCode : err ? err.statusCode : 404
  return {statusCode}
}

export default Error
