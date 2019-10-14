import { FunctionComponent } from 'react';
import { SectionStoryblok } from '../../typings/generated/components-schema';
export interface SectionProps extends SectionStoryblok {
    presetVariant?: Pick<SectionStoryblok, 'variant'>;
}
declare const Section: FunctionComponent<{
    content: SectionProps;
}>;
export default Section;
