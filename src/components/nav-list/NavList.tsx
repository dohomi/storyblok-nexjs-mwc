import SbEditable from 'storyblok-react'
import * as React from 'react'
import { FunctionComponent, memo } from 'react'
import { NavListStoryblok } from '../../typings/generated/components-schema'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import { CollapsibleList, SimpleListItem } from '@rmwc/list'
import NavListItem from './NavListItem'
import clsx from 'clsx'

const NavList: FunctionComponent<{ content: NavListStoryblok }> = ({ content }) => {
  const dimensions = useWindowDimensions()
  const body = content && content.body || []
  if (dimensions.isMobile && content.collapse_on_mobile) {
    const metaIcon = content.collapse_icon && content.collapse_icon.name || 'chevron_right'
    return (
      <SbEditable content={content}>
        <CollapsibleList handle={<SimpleListItem text={content.header} metaIcon={metaIcon} />}>
          {body.map((blok) => <NavListItem {...blok} key={blok._uid} />)}
        </CollapsibleList>
      </SbEditable>
    )
  }
  const properties = content.properties || []
  const header = content.header
  const navClassNames = clsx(content.style, 'nav', properties)
  return (
    <SbEditable content={content}>
      <div className={clsx(content.class_names && content.class_names.values)}>
        {header && <h4 className="nav-list__header">{header}</h4>}
        <nav className={navClassNames}>
          {body.map((blok) => <NavListItem {...blok} key={blok._uid} />)}
        </nav>
      </div>
    </SbEditable>
  )
}

export default memo<{ content: NavListStoryblok }>(NavList)
