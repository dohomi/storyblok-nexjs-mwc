import { GetServerSideProps } from 'next'
import StoryblokService from '../StoryblokService'
import getPageProps from '@initialData/getPageProps'


const pagesGetServerSideProps: GetServerSideProps = async (props) => {
  // const slug = Array.isArray(currentSlug) ? currentSlug.join('/') : currentSlug
  const { query } = props
  try {
    const slug = query?.index || 'home'
    console.log('pagesGetServerSideProps', slug)

    StoryblokService.setDevMode()
    StoryblokService.setQuery(query)

    const pageProps = await getPageProps(slug)
    return {
      props: pageProps
    }
  } catch (e) {
    console.log('error', e)
    throw new Error('error occured')
  }
}

export default pagesGetServerSideProps
