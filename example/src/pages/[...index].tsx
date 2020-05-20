import React from 'react'
import { default as ComponentRender, LmPagesIndex } from 'lumen-cms-core'
import pagesGetStaticProps from '../utils/initial-props/pagesGetStaticProps'
import pagesGetStaticPaths from '../utils/initial-props/pagesGetStaticPaths'

export default function Index(props) {
  return <LmPagesIndex {...props} ComponentRender={ComponentRender} />
}

export const getStaticProps = pagesGetStaticProps

export const getStaticPaths = pagesGetStaticPaths

