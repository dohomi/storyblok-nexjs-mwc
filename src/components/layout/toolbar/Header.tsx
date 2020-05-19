import * as React from 'react'
import { memo } from 'react'
import HeaderCustom from './HeaderCustom'
import HeaderSimple from './HeaderSimple'
import { GlobalStoryblok } from '../../../typings/generated/components-schema'
import { CoreComponentProps } from '../../core/CoreComponentProps'

type LmHeaderProps = CoreComponentProps & {
  settings: GlobalStoryblok
}

function Header({ settings, ComponentRender }: LmHeaderProps): JSX.Element {
  if (settings.multi_toolbar && settings.multi_toolbar.length) {
    return <HeaderCustom settings={settings} />
  }
  return <HeaderSimple settings={settings} ComponentRender={ComponentRender} />
}

export default memo(Header)
