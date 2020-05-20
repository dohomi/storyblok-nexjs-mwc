import { default as ComponentRender, LmPagesIndex } from 'lumen-cms-core'
import pagesGetStaticProps from '../utils/initial-props/pagesGetStaticProps'
import React from 'react'

export default function Index(props) {
  return <LmPagesIndex {...props} ComponentRender={ComponentRender} />
}

export const getStaticProps = pagesGetStaticProps



