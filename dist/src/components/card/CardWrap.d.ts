import { CardProps } from '@rmwc/card';
import { CSSProperties, FunctionComponent } from 'react';
import { CardListItemProps } from './CardLinkActionTitle';
declare type CardWrapProps = CardProps & {
    className: string;
    style: CSSProperties;
    content: CardListItemProps;
};
declare const CardWrap: FunctionComponent<CardWrapProps>;
export default CardWrap;
