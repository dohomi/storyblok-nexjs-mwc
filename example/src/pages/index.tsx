import { default as ComponentRender, LmPagesIndex } from 'lumen-cms-core'
import pagesGetStaticProps from '../utils/initial-props/pagesGetStaticProps'
import React from 'react'
import { LmStoryblokComponentRender } from '../components/StoryblokComponentRender'

export default function Index(props) {
  return <LmPagesIndex {...props}
                       ComponentRender={props.insideStoryblok ? LmStoryblokComponentRender : ComponentRender} />
}

export const getStaticProps = pagesGetStaticProps
