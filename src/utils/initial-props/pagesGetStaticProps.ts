import { GetStaticProps } from 'next'
import StoryblokService from '../StoryblokService'
import getPageProps from '@initialData/getPageProps'
import { getBaseProps } from '@initialData/getBaseProps'
import { AppPageProps } from '../../typings/app'

const pagesGetStaticProps: GetStaticProps = async (props): Promise<{ props: AppPageProps }> => {
  // const slug = Array.isArray(currentSlug) ? currentSlug.join('/') : currentSlug
  const { params, previewData } = props
  const slug = params?.index || 'home'
  if (Array.isArray(slug) && slug[0] === '_dev_') {
    return { props: getBaseProps({ type: 'not_supported' }) }// do nothing _dev_ mode is active
  }
  try {
    console.log('pagesGetStaticProps', previewData)
    if (previewData && previewData.query) {
      StoryblokService.setQuery(previewData.query)
    }
    const pageProps = await getPageProps(slug)
    return {
      props: pageProps
    }
  } catch (e) {
    console.log('error', e)
    throw new Error('error occured')
  }
}

export default pagesGetStaticProps
