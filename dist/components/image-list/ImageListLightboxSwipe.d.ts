import { FunctionComponent } from 'react';
import { ImageListItemStoryblok } from '../../typings/generated/components-schema';
import { WithWindowDimensionsProps } from '../provider/WindowDimensionsProvider';
export declare type ImageListLightboxProps = {
    elements: ImageListItemStoryblok[];
    lightbox: string;
    setLightbox: Function;
    onImageClick: Function;
    dimensions: WithWindowDimensionsProps;
    className: string;
};
declare const Swipe: FunctionComponent<ImageListLightboxProps>;
export default Swipe;
