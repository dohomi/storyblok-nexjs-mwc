import React, { FunctionComponent, memo, useEffect } from 'react'
import DrawerContentList from './DrawerContentList'
import Link from 'next/link'
import imageService from '../../../utils/ImageService'
import { useGlobalState } from '../../../utils/state/state'
import { GlobalStoryblok } from '../../../typings/generated/components-schema'
import Drawer, { DrawerProps } from '@material-ui/core/Drawer'
import { homepageLinkHandler } from '../../../utils/linkHandler'
import { useWindowDimensions } from '../../provider/WindowDimensionsProvider'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { closeNavigationDrawers } from '../../../utils/state/actions'
import clsx from 'clsx'


export const useStyles = makeStyles((theme: Theme) => createStyles({
  leftDrawer: {
    width: theme.drawer.left
  }
}))

const MwcDrawer: FunctionComponent<{ content: GlobalStoryblok }> = ({ content }) => {
  const classes = useStyles()
  const router = useRouter()
  const { asPath } = router
  const [isOpen, setOpen] = useGlobalState('leftNavigationDrawer')
  const [appSetup, setAppSetup] = useGlobalState('appSetup')
  const { isMobile } = useWindowDimensions()
  const websiteTitle = content.website_title
  const websiteLogo = content.website_logo
  const websiteSlogan = content.website_slogan
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
        closeNavigationDrawers() // todo needs testing might need a pure close drawer action
      }
    },
    [asPath, appSetup]
  )

  useEffect(
    () => {
      if (!isMobile) {
        setOpen(true) // todo make this customizable?
      } else {
        setAppSetup({
          ...appSetup,
          drawerVariant: 'temporary' // make sure mobile only has temporary
        })
      }
    },
    [setOpen, isMobile, appSetup, setAppSetup]
  )

  return (
    <Drawer open={isOpen}
            className={clsx('lm-main__drawer', classes.leftDrawer)}
            classes={{
              paper: classes.leftDrawer
            }}
            onClose={() => setOpen(false)}
            {...drawerProps}>
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
      <DrawerContentList content={content} />
    </Drawer>
  )
}

export default memo(MwcDrawer)
