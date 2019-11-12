import * as React from 'react'
import { FunctionComponent } from 'react'
import HeaderCustom from './HeaderCustom'
import HeaderSimple from './HeaderSimple'
import { AppHeaderProps } from './TopAppBar'

const Header: FunctionComponent<AppHeaderProps> = (props) => {
  if (props.settings.multi_toolbar && props.settings.multi_toolbar.length) {
    return <HeaderCustom {...props} />
  }
  return <HeaderSimple {...props} />
}


export default Header
