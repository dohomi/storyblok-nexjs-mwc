import React, { ChangeEvent, CSSProperties, FunctionComponent, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { PageItem } from '../../typings/generated/schema'
import { ListSearchAutocompleteStoryblok } from '../../typings/generated/components-schema'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import LmIcon from '../icon/LmIcon'
import { Magnify } from 'mdi-material-ui'
import { useAppContext } from '../provider/AppProvider'
import clsx from 'clsx'
import { getLinkAttrs } from '../../utils/linkHandler'
import Link from 'next/link'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      display: 'inline-block',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade('rgba(0,0,0,.05)', 0.15),
      '&:hover': {
        backgroundColor: fade('rgba(0,0,0,.05)', 0.25)
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
      }
    },
    searchOutlined: {
      border: `1px solid ${theme.palette.divider}`,
      '&:hover': {
        border: `1px solid ${theme.palette.action.hover}`
      },
      '&:focus': {
        border: `1px solid ${theme.palette.action.focus}`
      }
    },
    borderSquare: {
      borderRadius: 0
    },
    borderRounded: {
      borderRadius: '25px'
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit',
      position: 'relative'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7)
    },
    inputDefaultWidth: {
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus,&:active': {
          width: 200
        }
      }
    },
    inputFullWidth: {
      width: '100%'
    }
  }))


const ListSearchAutocomplete: FunctionComponent<{ content: ListSearchAutocompleteStoryblok }> = ({ content }) => {
  const classes = useStyles()
  const [items, setItems] = useState<PageItem[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { allStories } = useAppContext()

  const [debounceFunc] = useDebouncedCallback(
    (value: string) => {
      if (value.length < 2) {
        return
      }
      const filtered = allStories
        .filter((story) =>
          [story.content?.preview_title, story.full_slug, story.content?.meta_title, story.name]
            .some((term) => term && term.search(new RegExp(value, 'i')) !== -1)
        )
      setItems(filtered)
      setOpen(true)
      setSearchText(value)
      // StoryblokService.getSearch(`cdn/stories`, {
      //   per_page: 25,
      //   sort_by: 'content.preview_title:desc',
      //   excluding_fields: 'body,right_body,meta_robots,property,seo_body',
      //   search_term: value,
      //   filter_query: {
      //     'component': {
      //       'in': 'page'
      //     }
      //   }
      // }).then(res => {
      //   setItems(res.data.stories)
      //   setOpen(true)
      //   setSearchText(value)
      // })
    },
    400
  )

  function onSearchChange(value: string) {
    setSearchText(value)
    debounceFunc(value)
  }

  const additionalDivStyles: CSSProperties = {}
  if (content.shape === 'rounded' && content.height) {
    additionalDivStyles.borderRadius = content.height ? `${content.height / 1.5}px` : undefined
    additionalDivStyles.paddingLeft = content.height ? `${content.height / 2}px` : undefined
    additionalDivStyles.paddingRight = content.height ? `${content.height / 2}px` : undefined

  }
  return (
    <>
      <div
        style={additionalDivStyles}
        className={clsx(classes.search, {
          [classes.inputFullWidth]: content.fullwidth,
          [classes.borderSquare]: content.shape === 'square',
          [classes.borderRounded]: content.shape === 'rounded',
          [classes.searchOutlined]: content.outlined
        })}>
        <div className={classes.searchIcon}>
          {content.icon && content.icon.name ? <LmIcon iconName={content.icon.name} /> : <Magnify />}
        </div>
        <InputBase placeholder={content.placeholder || content.label}
                   classes={{
                     root: clsx(classes.inputRoot, {
                       [classes.inputFullWidth]: content.fullwidth
                     }),
                     input: clsx(classes.inputInput, {
                       [classes.inputDefaultWidth]: !content.fullwidth,
                       [classes.inputFullWidth]: content.fullwidth
                     })
                   }}
                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
                     setAnchorEl(event.currentTarget)
                     onSearchChange(event.currentTarget.value)
                   }}
                   value={searchText}
                   inputProps={{
                     'aria-label': 'search',
                     type: 'search',
                     style: {
                       height: content.height ? `${content.height}px` : undefined
                     }
                   }}
        />
      </div>
      <Menu open={open}
            anchorEl={anchorEl}
            onClose={() => setOpen(false)}
            getContentAnchorEl={null}
            PaperProps={{
              style: {
                borderRadius: content.menu_border_radius ? content.menu_border_radius : undefined
              }
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: content.menu_align || 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: content.menu_align || 'left'
            }}
      >
        {items.length < 1 && (
          <MenuItem>{content.not_found_label}</MenuItem>
        )}
        {items.map(item => {

          const { rel, target, external, ...rest } = getLinkAttrs({
            cached_url: item.full_slug as string,
            linktype: 'story'
          }, {})
          return (
            <Link href="/[...index]" as={rest.href} passHref key={item.uuid as string}>
              <MenuItem
                onClick={() => setOpen(false)}>{item.content && (item.content.preview_title || item.content.meta_title || item.name)}</MenuItem>
            </Link>
          )
        })}
      </Menu>
    </>
  )
}

export default ListSearchAutocomplete
