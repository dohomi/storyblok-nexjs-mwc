import SbEditable from 'storyblok-react';
import clsx from 'clsx';
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
var useStyles = makeStyles(function (theme) { return createStyles({
    tables: {
        tableLayout: 'fixed',
        borderSpacing: 0,
        borderCollapse: 'collapse',
        '&.lm-table__bordered, &.lm-table__bordered-bold': {
            '& td, & th': {
                border: "1px solid " + (theme.palette.type === 'dark' ? theme.palette.common.white : theme.palette.common.black),
                padding: theme.spacing(3)
            }
        },
        '&.lm-table__bordered-bold': {
            '& td, & th': {
                border: "2px solid " + (theme.palette.type === 'dark' ? theme.palette.common.white : theme.palette.common.black)
            },
            '& th': {
                textAlign: 'left'
            },
            '& tbody tr:last-child': {
                '& td': {
                    fontWeight: 'bold'
                }
            }
        },
        '&.lm-table__boxed': {
            border: "1px solid " + (theme.palette.type === 'dark' ? theme.palette.common.white : theme.palette.common.black),
            borderCollapse: 'separate',
            backgroundColor: theme.palette.background.paper,
            '& td': {
                border: "1px solid " + theme.palette.divider,
                padding: theme.spacing(3)
            }
        },
        '&.lm-table__price': {
            width: '100%',
            '& td': {
                padding: theme.spacing(4) + "px 0",
                borderBottom: "1px solid " + theme.palette.divider,
                '&:first-child': {
                    width: '80%'
                },
                '&:not(:first-child)': {
                    textAlign: 'right'
                },
                '&:last-child': {
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                    // fontFamily: '' // todo
                }
            }
        },
        '&.lm-table__comparison': {
            '& thead': {
                '& th': {
                    textAlign: 'center',
                    '&:not(:first-of-type)': {
                        borderRight: "1px solid " + theme.palette.divider,
                        padding: theme.spacing(4),
                        color: theme.palette.primary.contrastText,
                        backgroundColor: theme.palette.primary.main
                        // fontFamily: $table-comparison-header-font-family;
                    },
                    '&:nth-child(2)': {
                        borderTopLeftRadius: '10px'
                    },
                    '&:last-child': {
                        borderRight: 'none',
                        borderTopRightRadius: '10px'
                    }
                }
            },
            '& tbody': {
                '& td': {
                    padding: theme.spacing(4) + "px 0",
                    borderTop: "1px solid " + theme.palette.divider,
                    '&:first-of-type': {
                        color: theme.palette.text.primary,
                        padding: '25px 35px 25px 0'
                    },
                    '&:not(:first-child)': {
                        color: theme.palette.text.secondary,
                        textAlign: 'center',
                        boxShadow: '-1px 1px 3px 0 rgba(240, 240, 240, .7)',
                        borderLeft: "1px solid " + theme.palette.divider,
                        borderRight: "1px solid " + theme.palette.divider
                    },
                    '&:last-child': {
                        boxShadow: '1px 0 3px 0 rgba(240, 240, 240, .75)' // theme.shadows[2]//
                    }
                },
                '& tr:last-child > td': {
                    borderBottom: "1px solid " + theme.palette.divider,
                    '&:not(:first-child)': {
                        borderBottom: "1px solid " + theme.palette.divider,
                        boxShadow: '-1px 3px 7px 0 rgba(240, 240, 240, .7)'
                    }
                }
            }
        }
    }
}); });
var TableRow = function (_a) {
    var content = _a.content, index = _a.index;
    return (React.createElement("tr", null, content.map(function (column, iterator) { return React.createElement("td", { key: "column_" + index + "_" + iterator, dangerouslySetInnerHTML: { __html: column } }); })));
};
var Table = function (_a) {
    var _b;
    var content = _a.content;
    var classes = useStyles();
    var className = clsx(classes.tables, 'lm-table', content.class_names && content.class_names.values, (_b = {},
        _b["lm-table__" + content.variant] = !!content.variant,
        _b));
    var tableBody = content.body && content.body.tbody || [];
    var tableHead = content.body && content.body.thead || [];
    return (React.createElement(SbEditable, { content: content },
        React.createElement("table", { className: className },
            !content.disable_table_head && (React.createElement("thead", null,
                React.createElement("tr", null, tableHead.map(function (content, index) { return React.createElement("th", { key: "head_" + index }, content); })))),
            React.createElement("tbody", null, tableBody.map(function (row, index) { return React.createElement(TableRow, { key: "row_" + index, index: index, content: row }); })))));
};
export default Table;
