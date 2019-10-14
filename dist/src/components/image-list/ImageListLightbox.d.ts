import { FunctionComponent } from 'react';
import { WithWindowDimensionsProps } from '../provider/WindowDimensionsProvider';
import { ImageListItemStoryblok } from '../../typings/generated/components-schema';
declare type ImageListLightboxProps = {
    elements: ImageListItemStoryblok[];
    lightbox: string;
    setLightbox: Function;
    onImageClick: Function;
    dimensions: WithWindowDimensionsProps;
};
declare const ImageListLightbox: FunctionComponent<ImageListLightboxProps>;
export default ImageListLightbox;
