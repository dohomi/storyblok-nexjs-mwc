import React, { FunctionComponent } from 'react'
import { ListSearchAutocompleteStoryblok } from '../../typings/generated/components-schema'
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles'
import { useAppContext } from '../provider/AppProvider'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField } from '@material-ui/core'
import { getLinkAttrs } from '../../utils/linkHandler'
import MuiNextLink from '../link/MuiNextLink'
import LmIcon from '../icon/LmIcon'
import { Magnify } from 'mdi-material-ui'
import clsx from 'clsx'
import matchSorter from 'match-sorter'
import InputAdornment from '@material-ui/core/InputAdornment'
import Paper from '@material-ui/core/Paper'

// @ts-ignore
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiInputLabel-root.Mui-focused': {
        color: 'inherit'
      }
    },
    inputRoot: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade('rgba(0,0,0,.05)', 0.15),

      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.divider
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.action.focus
      },
      '&:hover': {
        backgroundColor: fade('rgba(0,0,0,.05)', 0.25),
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.action.focus
        }
      }
    },
    borderSquare: {
      borderRadius: 0,
      '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: 0
      }
    },
    borderRounded: {
      borderRadius: '25px',
      '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: '25px'
      }
    },
    inputPadding: {
      padding: theme.spacing(1, 3, 1, 3)
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
    listbox: {
      '& .MuiLink-root': {
        display: 'block',
        width: '100%',
        color: 'inherit',
        '&:hover': {
          textDecoration: 'none'
        }
      }
    }
  }))


const ListSearchAutocomplete: FunctionComponent<{ content: ListSearchAutocompleteStoryblok }> = ({ content }) => {
  const { allStories } = useAppContext()

  // @ts-ignore
  const classes = useStyles()

  // console.log(options)
  return (
    <Autocomplete
      options={allStories}
      classes={{
        root: classes.root,
        listbox: classes.listbox
      }}
      renderInput={(params) => (
        <TextField {...params}
                   size={'small'}
                   variant={'outlined'}
                   label={content.label || undefined}
                   placeholder={content.placeholder}
                   fullWidth={content.fullwidth ? true : false}
                   InputProps={{
                     ...params.InputProps,
                     autoComplete: 'new-password',
                     startAdornment: <InputAdornment position="start"> {content.icon?.name ?
                       <LmIcon iconName={content.icon.name} /> : <Magnify />}</InputAdornment>,
                     classes: {
                       root: clsx(classes.inputRoot, {
                         [classes.borderSquare]: content.shape === 'square',
                         [classes.borderRounded]: content.shape === 'rounded'
                       }),
                       input: classes.inputDefaultWidth
                     }
                   }}
        />
      )}
      noOptionsText={content.not_found_label}
      getOptionLabel={(option) => (option.content?.preview_title || option.content?.meta_title || option.name) as string}
      filterOptions={(options, { inputValue }) =>
        matchSorter(options, inputValue, { keys: ['content.preview_title', 'content.meta_title', 'name'] })
        // .filter(story =>
        //   [story.content?.preview_title, story.full_slug, story.content?.meta_title, story.name]
        //     .some((term) => term && term.search(new RegExp(state.inputValue, 'i')) !== -1)
        // )
      }
      PaperComponent={props => <Paper {...props}
                                      style={{
                                        borderRadius: content.menu_border_radius ? content.menu_border_radius : undefined
                                      }}
                                      classes={{}}
      />}
      renderOption={(item) => {
        const { rel, target, external, ...rest } = getLinkAttrs({
          cached_url: item.full_slug as string,
          linktype: 'story'
        }, {})
        return (
          <MuiNextLink href="/[...index]" as={rest.href} passHref key={item.uuid as string} prefetch={false}>
            {item.content && (item.content.preview_title || item.content.meta_title || item.name)}
          </MuiNextLink>
        )
      }}
    />
  )
}

export default ListSearchAutocomplete
