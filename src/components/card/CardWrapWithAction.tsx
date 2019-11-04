import SbEditable from 'storyblok-react'
import Drawer from '@material-ui/core/Drawer'
import Components from '@components'
import React, { CSSProperties, FunctionComponent } from 'react'
import { CardListItemProps } from './cards'
import Card from '@material-ui/core/Card'
import { makeStyles, Theme } from '@material-ui/core/styles'

interface CardWrapAction extends CardListItemProps {
  className: string
  style: CSSProperties,
  outlined: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  drawerContent: {
    padding: theme.spacing(3),
    minWidth: '30%'
  }
}))

const CardWrapWithAction: FunctionComponent<CardWrapAction> = ({ content, className, style, children }) => {
  const classes = useStyles()
  let [open, setOpen] = React.useState<boolean>(false)
  const body = content.body || []

  return (
    <SbEditable content={content}>
      <Card className={className}
            style={style}>
        <a onClick={() => setOpen(!open)}>
          {children}
        </a>
      </Card>
      <Drawer open={open}
              anchor="right"
              onClose={() => setOpen(false)}>
        <div className={classes.drawerContent}>
          {body.map(blok => Components(blok))}
        </div>
      </Drawer>
    </SbEditable>
  )
}

export default CardWrapWithAction
