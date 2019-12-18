import SbEditable from 'storyblok-react'
import CardListItem from './CardListItem'
import clsx from 'clsx'
import React, { FunctionComponent } from 'react'
import { CardListStoryblok } from '../../typings/generated/components-schema'
import { makeStyles } from '@material-ui/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { useGridListStyles } from './cardListStyles'

const useStyles = makeStyles({
    cardBase: {
      overflowX: 'hidden',
      flexGrow: 1,
      '& .MuiGridListTile-tile': {
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
    }
  }
)


const CardList: FunctionComponent<{ content: CardListStoryblok }> = ({ content }) => {
  const { body, column_gap, column_count, column_count_phone, column_count_tablet, ...rest } = content
  const classes = useStyles(content)
  const gridClasses = useGridListStyles({
    columnCount: content.column_count,
    columnCountPhone: content.column_count_phone,
    columnCountTablet: content.column_count_tablet
  })
  let gutterSize = content.column_gap ? Number(content.column_gap) : 24

  const items = body || []
  const variant = content.variant || []
  return (
    <SbEditable content={content}>
      <div
        style={{
          padding: `${gutterSize / 2}px`
        }}
        className={clsx(classes.cardBase, variant.map(i => 'card__' + i), {
          ['ratio-' + content.image_ratio]: content.image_ratio
        })}>
        <GridList spacing={gutterSize}
                  cellHeight={'auto'}
                  className={gridClasses.gridList}>
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
