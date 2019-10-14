import { CardMediaProps } from '@rmwc/card';
import { FunctionComponent } from 'react';
import { CardListStoryblok } from '../../typings/generated/components-schema';
export declare type CardMediaElementProps = CardMediaProps & Pick<CardListStoryblok, 'image_size' | 'variant'> & {
    inView: boolean;
    image?: string;
    width: number;
    height: number;
};
declare const CardMediaElement: FunctionComponent<CardMediaElementProps>;
export default CardMediaElement;
