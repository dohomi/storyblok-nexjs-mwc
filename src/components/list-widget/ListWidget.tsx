import React from 'react'
import {
  CardListStoryblok,
  ListsStoryblok,
  ListWidgetStoryblok,
  NavListStoryblok
} from '../../typings/generated/components-schema'
import { useListSearch } from './useListSearch'
import ListWidgetContainer from './ListWidgetContainer'
import { useAppContext } from '../provider/AppProvider'
import { CoreComponentProps } from '../core/CoreComponentProps'

export type LmListWidgetProps = CoreComponentProps & { content: ListWidgetStoryblok }

export function LmListWidget({ content, ComponentRender }: LmListWidgetProps): JSX.Element {

  const { listWidgetData } = useAppContext()
  let items = useListSearch((listWidgetData && listWidgetData[content._uid]) || [], !!content.enable_for_search)

  const listOption: (ListsStoryblok | CardListStoryblok | NavListStoryblok) = (content.list_options && content.list_options[0]) || {}

  return <ListWidgetContainer
    options={listOption}
    content={content}
    items={items}
    ComponentRender={ComponentRender}
  />
}
