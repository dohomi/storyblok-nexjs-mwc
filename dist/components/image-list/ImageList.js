import SbEditable from 'storyblok-react';
import React, { useState } from 'react';
import ImageListItem from './ImageListItem';
import ImageListLightbox from './ImageListLightbox';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import clsx from 'clsx';
import { useGridListStyles } from '../card/cardListStyles';
import { useImageListStyles } from './useImageListStyles';
const ImageList = (props) => {
    const content = props.content;
    const classes = useImageListStyles();
    const gridClasses = useGridListStyles({
        columnCount: content.column_count,
        columnCountPhone: content.column_count_phone,
        columnCountTablet: content.column_count_tablet,
        isMasonry: !!content.masonry
    });
    const dimensions = useWindowDimensions();
    const containerRef = React.createRef();
    const [lightbox, setLightbox] = useState('');
    let gutterSize = content.column_gap ? Number(content.column_gap) : 2;
    function onImageClick(element) {
        // open lightbox
        content.enable_lightbox && setLightbox(element._uid);
    }
    const body = content.body || [];
    let gridListProps = {
        spacing: gutterSize
        // cols: columnCount
    };
    if (content.masonry) {
        gridListProps.spacing = 0;
        delete gridListProps.cols;
        gridListProps.style = {
            // columnCount: columnCount,
            columnGap: `${gutterSize}px`
        };
    }
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { ref: containerRef, style: {
                padding: gutterSize + 'px'
            }, className: clsx(classes.root, {
                [classes.masonry]: content.masonry,
                [classes.aspectRatio]: content.aspect_ratio && !content.masonry,
                ['ratio-' + content.aspect_ratio]: content.aspect_ratio,
                'with-lightbox': content.enable_lightbox
            }) },
            React.createElement(GridList, Object.assign({ cellHeight: 'auto', className: gridClasses.gridList }, gridListProps), body.map((item, i) => (React.createElement(SbEditable, { content: item, key: item._uid },
                React.createElement(GridListTile, { style: {
                        padding: !content.masonry ? `${gutterSize}px` : undefined,
                        marginBottom: content.masonry ? `${gutterSize}px` : undefined
                    }, onClick: (ev) => onImageClick(Object.assign({ _uid: item._uid, count: i }, ev)) },
                    React.createElement(ImageListItem, { content: item, listProps: content }))))))),
        lightbox && ImageListLightbox({
            elements: body,
            lightbox,
            setLightbox,
            dimensions,
            onImageClick,
            className: classes.lightbox
        })));
};
export default ImageList;
