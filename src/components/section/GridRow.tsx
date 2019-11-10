import * as React from 'react'
import { FunctionComponent } from 'react'
import { RowStoryblok } from '../../typings/generated/components-schema'
import SbEditable from 'storyblok-react'
import Grid, { GridProps } from '@material-ui/core/Grid'
import { createStyles, makeStyles } from '@material-ui/styles'
import Components from '@components'
import BackgroundBox, { BackgroundBoxProps } from './BackgroundBox'
import clsx from 'clsx'
import BackgroundImage from './BackgroundImage'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridRow: {
      height: '100%',
      minHeight: 'inherit',
      '& .MuiGrid-item': {
        '& > .MuiGrid-direction-xs-column': {
          '& > *': {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            boxSizing: 'border-box',
            '&:first-child': {
              marginTop: 0
            },
            '&:last-child': {
              marginBottom: 0
            }
          }
        },
        '& > *': {
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
          boxSizing: 'border-box',
          '&:first-child': {
            marginTop: 0
          },
          '&:last-child': {
            marginBottom: 0
          },
          '& .MuiTypography-root': {
            '& > p': {
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(1),
              '&:first-child': {
                marginTop: 0
              },
              '&:last-child': {
                marginBottom: 0
              }
            }
          }
        }
      }
    }
  })
)

const GridRow: FunctionComponent<{ content: RowStoryblok }> = ({ content }) => {
  // const theme = useTheme()
  const classes = useStyles()
  let spacing = content.spacing ? Number(content.spacing) as GridProps['spacing'] : 3

  const background = Array.isArray(content.background) && content.background[0]
  return (
    <SbEditable content={content}>
      <BackgroundBox background={background}>
        {({ style, className }: BackgroundBoxProps) => (
          <Grid container
                style={{
                  ...style,
                  padding: spacing ? `-${spacing * 8}px` : undefined
                }}
                spacing={spacing}
                alignItems={content.align_items ? content.align_items : undefined}
                direction={content.direction ? content.direction : undefined}
                className={clsx(className, classes.gridRow)}
                justify={content.justify ? content.justify : undefined}
                alignContent={content.align_content ? content.align_content : undefined}>
            {background && background.image &&
            <BackgroundImage content={background} backgroundStyle={content.background_style} />}
            {content.body && content.body.map((blok) => Components(blok))}
          </Grid>
        )}
      </BackgroundBox>
    </SbEditable>
  )
}

export default GridRow
