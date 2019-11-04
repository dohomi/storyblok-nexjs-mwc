import SbEditable from 'storyblok-react'
import CardListItem from './CardListItem'
import clsx from 'clsx'
import React, { FunctionComponent } from 'react'
import { CardListStoryblok } from '../../typings/generated/components-schema'

import { createStyles, makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'

import { GridProps } from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

type CardListStyleProps = {
  spacing: number
  columnCount: number
  xsColumnCount: number
  smColumnCount: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardBase: {
      flexGrow: 1,
      '& .MuiGridListTile-tile':{
        overflow: 'visible'
      },
      '&.card__text_align_center .MuiCardMedia-root .MuiCardContent-root': {
        textAlign: 'center'
      },
      '&.card__text_align_right .MuiCardMedia-root .MuiCardContent-root': {
        textAlign: 'right'
      },
      '&.card__text_center .MuiCardMedia-root .MuiCardContent-root': {
        justifyContent: 'center'
      },
      '&.card__text_top_bottom .MuiCardMedia-root .MuiCardContent-root': {
        justifyContent: 'space-between'
      },
      '&.card__text_bottom .MuiCardMedia-root .MuiCardContent-root': {
        justifyContent: 'flex-end'
      },
      '& .MuiCardMedia-root': {
        paddingBottom: '56.25%' // add ratio variants
      },
      '&.ratio-1x1 .MuiCardMedia-root': {
        paddingBottom: '100%' // add ratio variants
      },
      '&.ratio-4x3 .MuiCardMedia-root': {
        paddingBottom: '75%' // add ratio variants
      },
      '&.ratio-3x2 .MuiCardMedia-root': {
        paddingBottom: '66.66%' // add ratio variants
      },
      '&.card__over_media .MuiCardMedia-root': {
        position: 'relative',
        paddingBottom: '56%', // add ratio variants

        '& .MuiCardContent-root': {
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }
      }
    },
    card: (props: CardListStyleProps) => ({
      overflowX: 'hidden',
      '& .MuiGrid-item': {
        width: 100 / props.columnCount + '%'
        // `calc(100% / ${props.columnCount} - ${(theme.spacing(props.spacing) / 2) / props.columnCount}px)`
      },
      [theme.breakpoints.only('xs')]: {
        '& .MuiGrid-item': {
          width: (props: CardListStyleProps) =>
            `calc(100% / ${props.xsColumnCount} - ${(theme.spacing(theme.spacing(props.spacing)) / 2) / (props.xsColumnCount * 100)}px)`
        }
      },
      [theme.breakpoints.only('sm')]: {
        '& .MuiGrid-item': {
          width: (props: CardListStyleProps) =>
            `calc(100% / ${props.smColumnCount} - ${(theme.spacing(theme.spacing(props.spacing)) / 2) / (props.smColumnCount * 100)}px)`
        }
      }
    })
  }))


const CardList: FunctionComponent<{ content: CardListStoryblok }> = ({ content }) => {
  const { body, column_gap, column_count, column_count_phone, column_count_tablet, ...rest } = content
  const spacing = column_gap ? Number(column_gap) : 24
  const styleProps: CardListStyleProps = {
    spacing,
    columnCount: column_count ? Number(column_count) : 5,
    xsColumnCount: column_count_phone ? Number(column_count_phone) : 1,
    smColumnCount: column_count_tablet ? Number(column_count_tablet) : 4
  }
  const classes = useStyles(styleProps)
  const items = body || []
  const variant = content.variant || []
  return (
    <SbEditable content={content}>
      <div className={clsx(classes.card, classes.cardBase, variant.map(i => 'card__' + i), {
        ['ratio-' + content.image_ratio]: content.image_ratio
      })}>
        <GridList spacing={spacing} cellHeight={'auto'} cols={styleProps.columnCount}>
          {items.map(item => (
            <GridListTile key={item._uid}>
              <CardListItem content={item} options={rest} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </SbEditable>
  )
}

export default CardList
