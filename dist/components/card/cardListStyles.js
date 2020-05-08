import { createStyles, makeStyles } from '@material-ui/core/styles';
export const useGridListStyles = makeStyles((theme) => createStyles({
    gridList: (props) => {
        if (!props.isMasonry) {
            const opts = {
                '& .MuiGridListTile-root': {
                    width: `${(100 / Number(props.columnCount || 4)) * 1}% !important`,
                    [theme.breakpoints.only('xs')]: {
                        width: `${(100 / Number(props.columnCountPhone || 1)) * 1}% !important`
                    }
                }
            };
            if (props.columnCountTablet) {
                opts[theme.breakpoints.between('sm', 'md')] = {
                    '& .MuiGridListTile-root': {
                        width: `${(100 / Number(props.columnCountTablet)) * 1}% !important`
                    }
                };
            }
            return opts;
        }
        else {
            const opts = {
                columnCount: Number(props.columnCount || 4),
                [theme.breakpoints.only('xs')]: {
                    columnCount: Number(props.columnCountPhone || 2)
                }
            };
            if (props.columnCountTablet) {
                opts[theme.breakpoints.between('sm', 'md')] = {
                    columnCount: Number(props.columnCountTablet)
                };
            }
            return opts;
        }
    }
}));
