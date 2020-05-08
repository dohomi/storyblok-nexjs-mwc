var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Components from '@components';
import SbEditable from 'storyblok-react';
import { ParallaxBanner } from 'react-scroll-parallax';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { getImageAttrs } from '../../utils/ImageService';
import { getImagePromise } from '../../utils/fetchImageHelper';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles/';
const useStyles = makeStyles({
    parallax: {
        '& .parallax-inner': {
            zIndex: 0
        },
        '& .parallax__content': {
            zIndex: 1,
            position: 'relative',
            height: '100%'
        }
    }
});
const SectionParallax = ({ content }) => {
    const dimensions = useWindowDimensions();
    const classes = useStyles();
    const [refIntersectionObserver, inView, refElement] = useInView(intersectionDefaultOptions);
    const width = dimensions.width;
    const height = dimensions.height;
    const elements = content.elements || [];
    const contentHeight = content.height;
    const [layers, setLayers] = useState();
    const disableLazyLoad = content.disable_lazy_load;
    const styles = {
        height: contentHeight ? `${contentHeight}vh` : '50vh',
    };
    // let [styles, setStyles] = useState(styles)
    useEffect(() => {
        if (disableLazyLoad) {
            processLayers();
        }
        else if (inView) {
            refElement && processLayers();
        }
    }, [inView, width, height]);
    function processLayers() {
        const items = elements.map((item) => __awaiter(this, void 0, void 0, function* () {
            const containerHeight = height * Number(contentHeight / 100);
            const offset = ((containerHeight * item.amount) * 2);
            const imgHeight = containerHeight + offset;
            const img = getImageAttrs({
                originalSource: item.image,
                width: width,
                height: ~~imgHeight,
                smart: true,
                focalPoint: item.image_focal_point
            });
            const imgSource = yield getImagePromise({ src: img.src, srcSet: img.srcSet });
            return {
                image: `"${imgSource}"`,
                amount: Number(item.amount),
                children: item.children && item.children.length && Components(item.children[0])
            };
        }));
        Promise.all(items)
            .then((layers) => {
            setLayers(layers);
        });
    }
    const body = content.body || [];
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: classes.parallax, style: styles, ref: refIntersectionObserver },
            React.createElement(ParallaxBanner, { disabled: false, style: styles, layers: layers || [] },
                !layers && React.createElement(Skeleton, { style: { position: 'absolute' }, width: '100%', height: '100%', variant: "rect" }),
                React.createElement("div", { className: clsx('parallax__content', content.class_names && content.class_names.values) }, body.map((blok) => Components(blok)))))));
};
export default SectionParallax;
