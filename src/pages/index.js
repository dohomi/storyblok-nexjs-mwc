import Components from 'components/index'
import Layout from '../components/Layout'
import React from 'react'
import {withRouter} from 'next/router'
import StoryblokService from '../utils/StoryblokService'
import WebpService from '../utils/WebpService'
import Head from '../components/Head'

class Index extends React.Component {
  constructor (props) {
    super(props)
    const pageContent = props.page && props.page.data.story.content || {}
    const settings = props.settings && props.settings.data.story.content || {}
    const body = pageContent.body || []
    const pageSeo = {
      title: pageContent.meta_title,
      description: pageContent.meta_description,
      disableRobots: pageContent.meta_robots
    }
    this.state = {
      pageContent,
      settings,
      hasFeature: body && this.hasFeatureAsFirstChild(body[0] || []), // enable content top and transparent header
      pageSeo
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.router.asPath !== prevProps.router.asPath) {
      const pageContent = this.props.page.data.story.content || {}
      const body = pageContent.body || []
      const pageSeo = {
        title: pageContent.meta_title,
        description: pageContent.meta_description,
        disableRobots: pageContent.meta_robots
      }
      this.setState({
        pageContent,
        hasFeature: body && this.hasFeatureAsFirstChild(body[0] || []),
        pageSeo
      })
    }
  }

  hasFeatureAsFirstChild (element) {
    const property = element.property || []
    return property.includes('is_feature')
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
