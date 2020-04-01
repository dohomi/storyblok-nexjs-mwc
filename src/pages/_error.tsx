import React, { FunctionComponent, useEffect, useState } from 'react'
import Head from 'next/head'
import Components from '@components'
import Layout from '../components/layout/Layout'
import { NextPage } from 'next'
import { GlobalStoryblok, PageStoryblok } from '../typings/generated/components-schema'
import WindowDimensionsProvider from '../components/provider/WindowDimensionsProvider'
import GlobalTheme from '../components/global-theme/GlobalTheme'
import StoryblokService from '../utils/StoryblokService'
import { CONFIG } from '../utils/config'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useGlobalState } from '../utils/state/state'
import AppSetupProvider from '../components/provider/AppSetupProvider'

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

const getErrorPath = ({ locale, statusCode }: { locale?: string, statusCode: number }) => {
  const currentLocale = locale !== CONFIG.defaultLocale ? locale : ''
  const directory = CONFIG.rootDirectory || currentLocale || ''
  return `cdn/stories/${directory ? `${directory}/` : ''}error-${statusCode}`
}

const ErrorContent: FunctionComponent<{ statusCode: number }> = ({ statusCode }) => {
  const title = (statusCodes as any)[statusCode] || 'An unexpected error has occurred'
  const [locale] = useGlobalState('locale')
  const [errorContent, setErrorContent] = useState<{ title: string, body: any[] } | null | undefined>(undefined)
  useEffect(
    () => {
      const fetchErrorContent = async () => {
        return await StoryblokService.get(getErrorPath({ statusCode, locale }))
      }

      fetchErrorContent()
        .then(({ data }) => {
          const errorContext = data && data.story && data.story.content
          if (errorContext) {
            setErrorContent(errorContext)
          } else {
            setErrorContent(null)
          }
        })
        .catch(e => {
          console.error(e)
          setErrorContent(null)
        })
    },
    [statusCode]
  )

  const errorTitle = (errorContent && errorContent.title) || `${statusCode} - ${title}`

  return (
    <>
      <Head>
        {errorContent !== undefined && <title>{errorTitle}</title>}
      </Head>
      <div className="p-5">
        {
          errorContent && errorContent.body && errorContent.body.map(blok => Components(blok))
        }
        {
          errorContent === null && (
            <div>
              {statusCode ? <h1>{statusCode}</h1> : null}
              <div>
                <h2>{title}.</h2>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}

const Error: NextPage<ErrorComponentProps> = (props) => {
  let { statusCode, settings } = props


  if (statusCode === 401) {
    console.log('error on Storyblok PREVIEW and PUBLIC token:', process.env.NODE_ENV, process.env.STORYBLOK_PREVIEW, process.env.STORYBLOK_PUBLIC)
    return <h3>Storyblok 401 error received</h3>
  }
  if (!(props.settings && props.settings._uid)) {
    return <h3>No settings found</h3>
  }

  return (
    <WindowDimensionsProvider>
      <GlobalTheme settings={settings}>
        <AppSetupProvider settings={settings}>
          <CssBaseline />
          <Head>
            <meta key="robots" name="robots" content="noindex" />
          </Head>
          <Layout settings={settings}>
            <ErrorContent statusCode={statusCode} />
          </Layout>
        </AppSetupProvider>
      </GlobalTheme>
    </WindowDimensionsProvider>
  )
}

// Error.getInitialProps = async ({ res, err }): Promise<ErrorComponentProps> => {
//   const statusCode = res && res.statusCode ? res.statusCode : err ? err.statusCode : 404
//   return { statusCode: statusCode as number, settings: { theme_base: 'dark', _uid: '', component: 'global' } }
// }

export default Error
