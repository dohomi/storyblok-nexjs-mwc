import React, { ChangeEvent, FunctionComponent, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import StoryblokService from '../../utils/StoryblokService'
import { PageItem } from '../../typings/generated/schema'
import { ListSearchAutocompleteStoryblok } from '../../typings/generated/components-schema'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
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
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus,&:active': {
          width: 200
        }
      }
    }
  })
)


const ListSearchAutocomplete: FunctionComponent<{ content: ListSearchAutocompleteStoryblok }> = ({ content }) => {
  const classes = useStyles()
  const [items, setItems] = useState<PageItem[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const [debounceFunc] = useDebouncedCallback(
    (value) => {
      if (value.length < 3) {
        return
      }
      StoryblokService.getSearch(`cdn/stories`, {
        per_page: 25,
        sort_by: 'content.preview_title:desc',
        excluding_fields: 'body,right_body,meta_robots,property,seo_body',
        search_term: value,
        filter_query: {
          'component': {
            'in': 'page'
          }
        }
      }).then(res => {
        setItems(res.data.stories)
        setOpen(true)
        setSearchText(value)
      })
    },
    400
  )

  function onSearchChange(value: string) {
    setSearchText(value)
    debounceFunc(value)
  }


  // className={clsx('lm-search__autocomplete lm-form', {
  //   'w-100': content.fullwidth,
  //     ['lm-form__shaped']: content.shape === 'rounded',
  //     ['lm-form__square']: content.shape === 'square'
  // })}
//
//   className = { clsx('lm-search__menu'
//   {
//     'lm-search__menu-right'
//   :
//     content.menu_align_right
//   }
// )
// }

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <Icon>{(content.icon && content.icon.name) || 'search'}</Icon>
        </div>
        <InputBase placeholder={content.placeholder || content.label}
                   classes={{
                     root: classes.inputRoot,
                     input: classes.inputInput
                   }}
                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
                     setAnchorEl(event.currentTarget)
                     onSearchChange(event.currentTarget.value)
                   }}
                   value={searchText}
                   inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      <Menu open={open}
            anchorEl={anchorEl}
            onClose={() => setOpen(false)}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: content.menu_align_right ? 'right' : 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: content.menu_align_right ? 'right' : 'left'
            }}
      >
        {items.length < 1 && (
          <MenuItem>{content.not_found_label}</MenuItem>
        )}
        {items.map(item => (
          <MenuItem
            key={item.uuid as string}>{item.content && (item.content.preview_title || item.content.meta_title || item.name)}</MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default ListSearchAutocomplete
