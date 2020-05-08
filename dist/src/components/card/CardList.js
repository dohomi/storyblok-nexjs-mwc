var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import SbEditable from 'storyblok-react';
import CardListItem from './CardListItem';
import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { useGridListStyles } from './cardListStyles';
import { useInfiniteScroll } from '../../utils/hooks/useInfiniteScroll';
const useStyles = makeStyles({
    cardBase: {
        overflowX: 'hidden',
        flexGrow: 1,
        '& .MuiGridListTile-tile': {
            overflow: 'visible'
        },
        '&.card__text_align_center .MuiCardMedia-root .MuiCardContent-root': {
            textAlign: 'center'
        },
        '&.card__text_align_right .MuiCardMedia-root .MuiCardContent-root': {
            textAlign: 'right'
        },
        '&.card__text_center .MuiCardMedia-root .MuiCardContent-root': {
            justifyContent: 'center'
        },
        '&.card__text_top_bottom .MuiCardMedia-root .MuiCardContent-root': {
            justifyContent: 'space-between'
        },
        '&.card__text_bottom .MuiCardMedia-root .MuiCardContent-root': {
            justifyContent: 'flex-end'
        },
        '& .MuiCardMedia-root': {
            paddingBottom: '56.25%' // add ratio variants
        },
        '&.ratio-1x1 .MuiCardMedia-root': {
            paddingBottom: '100%' // add ratio variants
        },
        '&.ratio-4x3 .MuiCardMedia-root': {
            paddingBottom: '75%' // add ratio variants
        },
        '&.ratio-3x2 .MuiCardMedia-root': {
            paddingBottom: '66.66%' // add ratio variants
        },
        '&.card__over_media .MuiCardMedia-root': {
            position: 'relative',
            '& .MuiCardContent-root': {
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }
        }
    }
});
const CardList = ({ content }) => {
    const { body, column_gap, column_count, column_count_phone, column_count_tablet } = content, rest = __rest(content, ["body", "column_gap", "column_count", "column_count_phone", "column_count_tablet"]);
    const classes = useStyles(content);
    const gridClasses = useGridListStyles({
        columnCount: content.column_count,
        columnCountPhone: content.column_count_phone,
        columnCountTablet: content.column_count_tablet
    });
    let gutterSize = content.column_gap ? Number(content.column_gap) : 24;
    const { ref, data, hasMore } = useInfiniteScroll(body || []);
    const variant = content.variant || [];
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { style: {
                padding: `${gutterSize / 2}px`
            }, className: clsx(classes.cardBase, variant.map(i => 'card__' + i), {
                ['ratio-' + content.image_ratio]: content.image_ratio
            }) },
            React.createElement(GridList, { spacing: gutterSize, cellHeight: 'auto', className: gridClasses.gridList }, data.map(item => (React.createElement(GridListTile, { key: item._uid },
                React.createElement(CardListItem, { content: item, options: rest }))))),
            React.createElement("div", { ref: hasMore ? ref : undefined }))));
};
export default CardList;
