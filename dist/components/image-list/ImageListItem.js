import * as React from 'react';
import { useState } from 'react';
import { Fade, GridListTileBar } from '@material-ui/core';
import { useInView } from 'react-intersection-observer';
import { getImageAttrs } from '../../utils/ImageService';
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig';
import { Skeleton } from '@material-ui/lab';
import ContentLink from '../link/ContentLink';
const ImageListItemWrap = ({ content, children }) => {
    var _a;
    return ((_a = content.link) === null || _a === void 0 ? void 0 : _a.cached_url) ? React.createElement(ContentLink, { className: 'img-list-item', content: content }, children)
        : React.createElement(React.Fragment, null, children);
};
const ImageListItem = (props) => {
    const { content, listProps } = props;
    const [inViewRef, inView, currentRef] = useInView(intersectionDefaultOptions);
    const [loaded, setLoaded] = useState(false);
    // const width = listProps.width
    const styles = {};
    let imageProps = {};
    if (inView && content.source && (currentRef === null || currentRef === void 0 ? void 0 : currentRef.target)) {
        // if (listProps.image_crop && !listProps.masonry /*|| (!listProps.masonry && !listProps.fit_in_color)*/) {
        //   height = listProps.height
        // }
        const tile = currentRef.target.closest('.MuiGridListTile-root');
        let width = tile === null || tile === void 0 ? void 0 : tile.clientWidth;
        let height = tile === null || tile === void 0 ? void 0 : tile.clientHeight;
        if (!width) {
            return React.createElement("span", null, "some error with image list item");
        }
        width = Math.ceil(width);
        const respectImgRatio = listProps.masonry || !listProps.aspect_ratio || !listProps.image_crop;
        height = respectImgRatio ? 0 : height && Math.ceil(height);
        const imgSrc = getImageAttrs({
            originalSource: content.source,
            width,
            height: height,
            smart: listProps.image_crop === 'smart',
            fitInColor: listProps.fit_in_color
        });
        imageProps = Object.assign(Object.assign({}, imgSrc), { width: width ? width : undefined, height: height ? height : undefined });
    }
    function onLoad() {
        setLoaded(true);
    }
    return (React.createElement(ImageListItemWrap, { content: content },
        !loaded && React.createElement(Skeleton, { width: '100%', height: '100%', style: { position: 'absolute' }, variant: "rect" }),
        React.createElement(Fade, { in: loaded },
            React.createElement("img", Object.assign({}, imageProps, { ref: inViewRef, style: styles, alt: 'image list item', onLoad: onLoad }))),
        (content.label || content.sub_title) &&
            React.createElement(GridListTileBar, { title: content.label, subtitle: content.sub_title, titlePosition: listProps.label_position || 'bottom' })));
};
export default ImageListItem;
