import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'


export const usePageStyles = makeStyles((theme: Theme) => createStyles({
  rightDocked: {
    width: theme.drawer.right,
    zIndex: theme.zIndex.appBar - 1
  },
  rightModal: {
    '& .lm-content-space': {
      display: 'none'
    }
  },
  rightDrawerPaper: {
    width: theme.drawer.right,
    padding: theme.spacing(2)
  },
  rightContent: {
    overflowY: 'auto'
  },
  content: {
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentWithRight: {
    marginRight: theme.drawer.right,
    [theme.breakpoints.only('xs')]: {
      marginRight: 0
    }
  },
  leftShift: {
    marginLeft: theme.drawer.left,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0
    }
  }
}))
