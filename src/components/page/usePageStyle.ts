import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const drawerWidth = 254 // right drawer

export const usePageStyles = makeStyles((theme: Theme) => createStyles({
  rightDocked: {
    width: drawerWidth,
    zIndex: theme.zIndex.appBar - 1
  },
  rightModal: {
    '& .lm-content-space': {
      display: 'none'
    }
  },
  rightDrawerPaper: {
    width: drawerWidth,
    padding: theme.spacing(2)
  },
  rightContent: {
    overflowY: 'auto'
  },
  contentWithRight: {
    marginRight: drawerWidth,
    [theme.breakpoints.only('xs')]: {
      marginRight: 0
    }
  }
}))
