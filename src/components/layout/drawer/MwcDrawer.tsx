import React, { FunctionComponent, useEffect } from 'react'
import { useGlobalState } from '../../../utils/state/state'
import Drawer, { DrawerProps } from '@material-ui/core/Drawer'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { BackgroundBoxProps } from '../../section/BackgroundBox'
import { useAppSetup } from '../../provider/AppSetupProvider'
import useMediaQuery from '@material-ui/core/useMediaQuery'


export const useStyles = makeStyles((theme: Theme) => createStyles({
  leftDrawer: {
    width: theme.drawer.left
  },
  aboveToolbar: {
    zIndex: theme.zIndex.drawer + 2
  },
  belowToolbar: {
    zIndex: theme.zIndex.appBar - 1
  },
  fullWidthMobile: {
    [theme.breakpoints.only('xs')]: {
      width: '100%'
    }
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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'))


  const drawerProps: DrawerProps = {
    variant: appSetup.drawerVariant
  }

  useEffect(
    () => {
      if (appSetup.drawerVariant === 'temporary' || isMobile) {
        setOpen(false)
      }
    },
    [asPath, appSetup, setOpen, isMobile]
  )

  const classList = backgroundProps?.className
  return (
    <Drawer open={isOpen}
            className={clsx('lm-main__drawer', classes.leftDrawer, {
              [classes.aboveToolbar]: !appSetup.drawerBelowToolbar,
              [classes.belowToolbar]: appSetup.drawerBelowToolbar,
              [classes.fullWidthMobile]: appSetup.drawerFullWidthMobile
            })}
            classes={{
              paper: clsx(
                'lm-main__drawer',
                classList,
                classes.leftDrawer,
                {
                  [classes.aboveToolbar]: !appSetup.drawerBelowToolbar,
                  [classes.belowToolbar]: appSetup.drawerBelowToolbar,
                  [classes.fullWidthMobile]: appSetup.drawerFullWidthMobile
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
