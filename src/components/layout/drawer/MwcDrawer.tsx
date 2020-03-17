import React, { FunctionComponent, memo, useEffect } from 'react'
import DrawerContentList from './DrawerContentList'
import Link from 'next/link'
import imageService from '../../../utils/ImageService'
import { useGlobalState } from '../../../utils/state/state'
import Drawer, { DrawerProps } from '@material-ui/core/Drawer'
import { homepageLinkHandler } from '../../../utils/linkHandler'
import { useWindowDimensions } from '../../provider/WindowDimensionsProvider'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { GlobalStoryblok } from '../../../typings/generated/components-schema'
import ContentSpace from '../ContentSpace'


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
  settings: GlobalStoryblok
}> = ({ children, settings }) => {
  const classes = useStyles()
  const router = useRouter()
  const { asPath } = router
  const [isOpen, setOpen] = useGlobalState('leftNavigationDrawer')
  const [appSetup] = useGlobalState('appSetup')
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

  return (
    <Drawer open={isOpen}
            className={clsx('lm-main__drawer', classes.leftDrawer, {
              [classes.aboveToolbar]: !appSetup.drawerBelowToolbar,
              [classes.belowToolbar]: appSetup.drawerBelowToolbar
            })}
            classes={{
              paper: clsx(
                'lm-main__drawer',
                settings.drawer_class_names && settings.drawer_class_names.values,
                classes.leftDrawer,
                {
                  [classes.aboveToolbar]: !appSetup.drawerBelowToolbar,
                  [classes.belowToolbar]: appSetup.drawerBelowToolbar
                })
            }}
            onClose={() => setOpen(false)}
            {...drawerProps}>
      {children}
    </Drawer>
  )
}

const DrawerComponent: FunctionComponent<{
  settings: GlobalStoryblok
}> = ({ settings }) => {
  const [appSetup] = useGlobalState('appSetup')
  const websiteTitle = settings.website_title
  const websiteLogo = settings.website_logo
  const websiteSlogan = settings.website_slogan
  return (
    <MwcDrawer settings={settings}>
      {!appSetup.hasDrawer && (<div>
        <Link href="/[...index]" as={homepageLinkHandler()}>
          <a>
            <div className="p-3">
              {!websiteLogo && websiteTitle}
              {websiteLogo &&
              <img src={imageService(websiteLogo, '0x128')} height="48" alt={websiteTitle || 'website logo'} />}
            </div>
          </a>
        </Link>
        {websiteSlogan && <div>{websiteSlogan}</div>}
      </div>)}
      {appSetup.drawerBelowToolbar && (
        <ContentSpace />
      )}
      <DrawerContentList content={settings} />
    </MwcDrawer>
  )
}

export default memo(DrawerComponent)
