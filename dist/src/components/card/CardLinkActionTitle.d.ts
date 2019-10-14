import { FunctionComponent } from 'react';
import { CardListItemStoryblok, CardListStoryblok } from '../../typings/generated/components-schema';
export interface CardListItemProps extends CardListItemStoryblok, Pick<CardListStoryblok, 'variant' | 'image_size' | 'elevation' | 'border_radius' | 'title_tag' | 'subtitle_tag' | 'title_typography' | 'subtitle_typography' | 'description_typography'> {
    inView: boolean;
    mediaDimension: {
        height: number;
        width: number;
    };
    titleClassName: string;
    subtitleClassName: string;
    descriptionClassName: string;
    sixteenByNine: boolean;
    square: boolean;
}
declare const CardListActionTitles: FunctionComponent<CardListItemProps>;
export default CardListActionTitles;
