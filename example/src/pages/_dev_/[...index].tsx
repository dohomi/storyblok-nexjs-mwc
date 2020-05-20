import React from 'react'
import { default as ComponentRender, LmPagesIndex } from 'lumen-cms-core'
import pagesGetServerSideProps from '../../utils/initial-props/pagesGetServerSideProps'

export default function Index(props) {
  return <LmPagesIndex {...props} ComponentRender={ComponentRender} />
}
export const getServerSideProps = pagesGetServerSideProps


