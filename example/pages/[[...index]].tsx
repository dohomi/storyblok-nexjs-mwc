import { pagesGetStaticPaths, pagesGetStaticProps } from '../lumen-cms-nextjs'
import { LmComponentRender, LmPagesIndex } from '../lumen-cms-core'
//
// export default LmDefaultPage
export const getStaticProps = pagesGetStaticProps
export const getStaticPaths = pagesGetStaticPaths

export default function MyPage(props) {

  return (
    <LmPagesIndex ComponentRender={LmComponentRender} {...props} />
  )
}
