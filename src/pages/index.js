import Components from 'components/index'
import React from 'react'
import {withRouter} from 'next/router'
import StoryblokService from '../utils/StoryblokService'
import WebpService from '../utils/WebpService'
import Head from '../components/Head'
import Layout from '../components/Layout'

const mapStateProps = (pageProps, checkSettings) => {
  let settings
  if (checkSettings) {
    settings = pageProps.settings && pageProps.settings.data && pageProps.settings.data.story && pageProps.settings.data.story.content || {}
  }
  const pageContent = pageProps.page && pageProps.page.data && pageProps.page.data.story && pageProps.page.data.story.content || {}
  const pageSeo = {
    title: pageContent.meta_title,
    description: pageContent.meta_description,
    disableRobots: pageContent.meta_robots
  }
  const hasFeature = pageContent && pageContent.body && pageContent.body[0] && pageContent.body[0].property && pageContent.body[0].property.includes('is_feature')
  const state = {
    pageContent,
    hasFeature,
    pageSeo
  }

  settings && (state.settings = settings)
  return state
}

class Index extends React.Component {


  constructor (props) {
    super(props)
    this.state = mapStateProps(props, true)
  }

  componentDidUpdate (prevProps) {
    if (this.props.router.asPath !== prevProps.router.asPath) {
      this.setState(mapStateProps(this.props))
    }
  }

  componentDidMount () {
    StoryblokService.initEditor(this)
  }

  render () {
    return (
      <>
        <Head settings={this.state.settings} pageSeo={this.state.pageSeo}/>
        <Layout settings={this.state.settings} hasFeature={this.state.hasFeature}>
          {Components(this.state.pageContent)}
        </Layout>
      </>
    )
  }
}

Index.getInitialProps = async (context) => {
  const query = context.query
  StoryblokService.setQuery(query)
  WebpService.setWebpSupport(context.req) // move this to _app?
  let slug = query.slug || 'home'
  if (slug.match(/^.*\.[^\\]+$/)) {
    return {}
  }
  try {
    let [page, settings] = await Promise.all([
      StoryblokService.get(`cdn/stories/${slug}`),
      StoryblokService.get(`cdn/stories/settings`)
    ])

    return {
      page,
      settings
    }
  } catch (e) {
    console.error(e)
  }
  return {}
}


export default withRouter(Index)
