import React, { FunctionComponent, useEffect } from 'react'
import { useGlobalState } from '../../../utils/state/state'
import Drawer, { DrawerProps } from '@material-ui/core/Drawer'
import { useWindowDimensions } from '../../provider/WindowDimensionsProvider'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { BackgroundBoxProps } from '../../section/BackgroundBox'
import { useAppSetup } from '../../provider/AppSetupProvider'


export const useStyles = makeStyles((theme: Theme) => createStyles({
  leftDrawer: {
    width: theme.drawer.left
  },
  aboveToolbar: { zIndex: theme.zIndex.drawer + 2 },
  belowToolbar: {
    zIndex: theme.zIndex.appBar - 1
  }
}))

const MwcDrawer: FunctionComponent<{
  backgroundProps?: BackgroundBoxProps
}> = ({ children, backgroundProps }) => {
  const classes = useStyles()
  const router = useRouter()
  const asPath = router?.asPath
  const [isOpen, setOpen] = useGlobalState('leftNavigationDrawer')
  const appSetup = useAppSetup()
  const { isMobile } = useWindowDimensions()

  const drawerProps: DrawerProps = {
    variant: appSetup.drawerVariant
  }
  if (isMobile) {
    drawerProps.variant = 'temporary'
  }
  useEffect(
    () => {
      if (appSetup.drawerVariant === 'temporary') {
        // todo make this customizable?
        setOpen(false) // todo needs testing might need a pure close drawer action
      }
    },
    [asPath, appSetup, setOpen]
  )

  const classList = backgroundProps?.className
  return (
    <Drawer open={isOpen}
            className={clsx('lm-main__drawer', classes.leftDrawer, {
              [classes.aboveToolbar]: !appSetup.drawerBelowToolbar,
              [classes.belowToolbar]: appSetup.drawerBelowToolbar
            })}
            classes={{
              paper: clsx(
                'lm-main__drawer',
                classList,
                classes.leftDrawer,
                {
                  [classes.aboveToolbar]: !appSetup.drawerBelowToolbar,
                  [classes.belowToolbar]: appSetup.drawerBelowToolbar
                })
            }}
            PaperProps={{
              style: backgroundProps?.style ? backgroundProps.style : undefined
            }}
            onClose={() => setOpen(false)}
            {...drawerProps}>
      {children}
    </Drawer>
  )
}

export default MwcDrawer
