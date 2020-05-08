import { FunctionComponent } from 'react';
import { BackgroundElementColorStoryblok, BackgroundElementGradientStoryblok, BackgroundElementItemStoryblok } from '../../typings/generated/components-schema';
declare const BackgroundElements: FunctionComponent<{
    elements: (BackgroundElementColorStoryblok | BackgroundElementItemStoryblok | BackgroundElementGradientStoryblok)[];
}>;
export default BackgroundElements;
