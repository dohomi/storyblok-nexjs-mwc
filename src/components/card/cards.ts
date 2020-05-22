import { CardListItemStoryblok, CardListStoryblok } from '../../typings/generated/components-schema'
import { CoreComponentProps } from '../core/CoreComponentProps'

export type CardListItemProps = CoreComponentProps & {
  content: CardListItemStoryblok
  options: Omit<CardListStoryblok, 'body' | 'column_gap' | 'column_count' | 'column_count_phone' | 'column_count_tablet'>
}
