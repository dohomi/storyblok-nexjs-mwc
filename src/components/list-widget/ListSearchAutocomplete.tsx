import React, { FunctionComponent } from 'react'
import { ListSearchAutocompleteStoryblok } from '../../typings/generated/components-schema'
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles'
import { useAppContext } from '../provider/AppProvider'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { TextField } from '@material-ui/core'
import { getLinkAttrs } from '../../utils/linkHandler'
import MuiNextLink from '../link/MuiNextLink'
import LmIcon from '../icon/LmIcon'
import { Magnify } from 'mdi-material-ui'
import clsx from 'clsx'
import InputAdornment from '@material-ui/core/InputAdornment'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-flex',
      verticalAlign: 'middle',
      '& .MuiInputLabel-root.Mui-focused': {
        color: 'inherit'
      }
    },
    inputRoot: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade('rgba(0,0,0,.05)', 0.15),
      color: 'inherit',
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
      color: 'inherit',
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

const filterOptions = createFilterOptions({
  startAfter: 2,
  matchFrom: 'any',
  stringify: (option: any) => option.label
})

const ListSearchAutocomplete: FunctionComponent<{ content: ListSearchAutocompleteStoryblok }> = ({ content }) => {
  const { allStories } = useAppContext()
  const classes = useStyles()

  // console.log(options)

  return (
    <Autocomplete
      options={allStories.map(option => ({
        uuid: option.uuid,
        full_slug: option.full_slug,
        label: option.content?.preview_title || option.content?.meta_title || option.name || ''
      })).sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))}
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
      getOptionLabel={(option) => option.label}
      filterOptions={filterOptions}
      PaperComponent={(props) => <Paper {...props}
                                        style={{
                                          ...props.style,
                                          borderRadius: content.menu_border_radius ? content.menu_border_radius : undefined
                                        }}
      />}
      renderOption={(item, { inputValue }) => {
        if (inputValue.length < 2) {
          return null
        }
        const { rel, target, external, ...rest } = getLinkAttrs({
          cached_url: item.full_slug as string,
          linktype: 'story'
        }, {})
        return (
          <MuiNextLink href="/[...index]" as={rest.href} passHref key={item.uuid as string} prefetch={false}>
            {item.label}
          </MuiNextLink>
        )
      }}
    />
  )
}

export default ListSearchAutocomplete
