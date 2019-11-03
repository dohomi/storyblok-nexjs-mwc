import * as React from 'react'
import { FunctionComponent } from 'react'
import { RowStoryblok } from '../../typings/generated/components-schema'
import SbEditable from 'storyblok-react'
import Box from '@material-ui/core/Box'
import { createStyles, makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'
import Components from '@components'
import BackgroundBox from './BackgroundBox'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      height: '100%',
      // alignItems: 'center', // todo make this configurable
      gridTemplateColumns: 'repeat(12, minmax(0,1fr))',
      gridGap: theme.spacing(3),
      padding: theme.spacing(3),
      margin: '0 auto',
      // paddingRight: theme.spacing(3),
      flexFlow: 'row wrap',
      [theme.breakpoints.only('xs')]: {
        gridTemplateColumns: 'repeat(4, minmax(0,1fr))'
      },
      [theme.breakpoints.only('sm')]: {
        gridTemplateColumns: 'repeat(8, minmax(0,1fr))'
      }
    }
  })
)

const GridRow: FunctionComponent<{ content: RowStoryblok }> = ({ content }) => {
  const classes = useStyles()
  return (
    <SbEditable content={content}>
      <BackgroundBox background={Array.isArray(content.background) && content.background[0]}>
        <Box className={classes.container}
             css={{
               alignItems: content.align_vertical || 'stretch',
               justifyItems: content.align_horizontal || 'stretch'
             }}>
          {content.body && content.body.map((blok) => Components(blok))}
        </Box>
      </BackgroundBox>
    </SbEditable>
  )
}

export default GridRow
