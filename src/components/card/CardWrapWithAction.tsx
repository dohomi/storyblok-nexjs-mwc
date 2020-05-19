import SbEditable from 'storyblok-react'
import Drawer from '@material-ui/core/Drawer'
import React, { CSSProperties, FunctionComponent } from 'react'
import { CardListItemProps } from './cards'
import Card from '@material-ui/core/Card'
import { makeStyles, Theme } from '@material-ui/core/styles'

interface CardWrapAction extends CardListItemProps {
  className: string
  style: CSSProperties
}

const useStyles = makeStyles((theme: Theme) => ({
  drawerContent: {
    padding: theme.spacing(3),
    minWidth: '30%'
  }
}))

const CardWrapWithAction: FunctionComponent<CardWrapAction> = ({ content, className, style, children, options, ComponentRender }) => {
  const classes = useStyles()
  let [open, setOpen] = React.useState<boolean>(false)
  const body = content.body || []
  const variants = options.variant || []

  return (
    <SbEditable content={content}>
      <Card className={className}
            raised={variants.includes('raised')}
            elevation={options.elevation ? Number(options.elevation) : undefined}
            style={style}>
        <a onClick={() => setOpen(!open)}>
          {children}
        </a>
      </Card>
      <Drawer open={open}
              anchor="right"
              onClose={() => setOpen(false)}>
        <div className={classes.drawerContent}>
          {body.map(blok => <ComponentRender content={blok} />)}
        </div>
      </Drawer>
    </SbEditable>
  )
}

export default CardWrapWithAction
