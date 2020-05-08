import { createStyles, makeStyles } from '@material-ui/core/styles';
export var useRichTextStyles = makeStyles(function (theme) { return createStyles({
    richText: {
        '& > p': {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            '&:first-child': {
                marginTop: 0
            },
            '&:last-child': {
                marginBottom: 0
            }
        }
    }
}); });
