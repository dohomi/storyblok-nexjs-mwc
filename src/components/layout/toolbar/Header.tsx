import * as React from 'react'
import { FunctionComponent, memo } from 'react'
import HeaderCustom from './HeaderCustom'
import HeaderSimple from './HeaderSimple'
import { GlobalStoryblok } from '../../../typings/generated/components-schema'

const Header: FunctionComponent<{
  settings: GlobalStoryblok
}> = ({ settings }) => {
  console.log('render header')
  if (settings.multi_toolbar && settings.multi_toolbar.length) {
    return <HeaderCustom settings={settings} />
  }
  return <HeaderSimple settings={settings} />
}

export default memo(Header)
