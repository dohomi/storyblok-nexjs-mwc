import { createStyles, makeStyles } from '@material-ui/core/styles';
export var usePageStyles = makeStyles(function (theme) {
    var _a, _b, _c, _d, _e, _f;
    return createStyles({
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
        },
        'right-mobile-sm': (_a = {},
            _a[theme.breakpoints.only('xs')] = {
                marginRight: '0 !important'
            },
            _a),
        'right-mobile-md': (_b = {},
            _b[theme.breakpoints.down('sm')] = {
                marginRight: 0
            },
            _b),
        'right-mobile-lg': (_c = {},
            _c[theme.breakpoints.down('md')] = {
                marginRight: 0
            },
            _c),
        leftShift: {
            marginLeft: theme.drawer.left,
            transition: theme.transitions.create(['margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        'left-mobile-sm': (_d = {},
            _d[theme.breakpoints.only('xs')] = {
                marginLeft: 0
            },
            _d),
        'left-mobile-md': (_e = {},
            _e[theme.breakpoints.down('sm')] = {
                marginLeft: 0
            },
            _e),
        'left-mobile-lg': (_f = {},
            _f[theme.breakpoints.down('md')] = {
                marginLeft: 0
            },
            _f),
    });
});
