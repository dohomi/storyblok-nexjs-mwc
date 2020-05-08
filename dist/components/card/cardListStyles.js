import { createStyles, makeStyles } from '@material-ui/core/styles';
export var useGridListStyles = makeStyles(function (theme) { return createStyles({
    gridList: function (props) {
        var _a, _b;
        if (!props.isMasonry) {
            var opts = {
                '& .MuiGridListTile-root': (_a = {
                        width: (100 / Number(props.columnCount || 4)) * 1 + "% !important"
                    },
                    _a[theme.breakpoints.only('xs')] = {
                        width: (100 / Number(props.columnCountPhone || 1)) * 1 + "% !important"
                    },
                    _a)
            };
            if (props.columnCountTablet) {
                opts[theme.breakpoints.between('sm', 'md')] = {
                    '& .MuiGridListTile-root': {
                        width: (100 / Number(props.columnCountTablet)) * 1 + "% !important"
                    }
                };
            }
            return opts;
        }
        else {
            var opts = (_b = {
                    columnCount: Number(props.columnCount || 4)
                },
                _b[theme.breakpoints.only('xs')] = {
                    columnCount: Number(props.columnCountPhone || 2)
                },
                _b);
            if (props.columnCountTablet) {
                opts[theme.breakpoints.between('sm', 'md')] = {
                    columnCount: Number(props.columnCountTablet)
                };
            }
            return opts;
        }
    }
}); });
