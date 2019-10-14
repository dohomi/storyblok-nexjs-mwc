import { ImageListItemStoryblok, ImageListStoryblok } from '../../typings/generated/components-schema';
import { CSSProperties, FunctionComponent } from 'react';
export declare type ImageListItemProps = Partial<ImageListItemStoryblok> & Pick<ImageListStoryblok, 'fit_in_color' | 'aspect_ratio' | 'masonry' | 'image_crop'> & {
    width: number;
    height: number;
    style: CSSProperties;
};
declare const Image: FunctionComponent<ImageListItemProps>;
export default Image;
