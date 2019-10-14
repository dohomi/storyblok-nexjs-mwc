import { FunctionComponent } from 'react';
import { PromotionItemStoryblok } from '../../typings/generated/components-schema';
import { WithWindowDimensionsProps } from '../provider/WindowDimensionsProvider';
declare const PromotionItem: FunctionComponent<PromotionItemStoryblok & {
    dimensions: WithWindowDimensionsProps;
}>;
export default PromotionItem;
