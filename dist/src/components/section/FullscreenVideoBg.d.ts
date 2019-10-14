import { FunctionComponent } from 'react';
import { SectionVideoBgStoryblok } from '../../typings/generated/components-schema';
declare type ContainerDimensions = {
    width: number;
    height: number;
};
declare type FullscreenVideoBgProps = SectionVideoBgStoryblok & {
    containerDimensions: ContainerDimensions;
    fixedToRatio: boolean;
    ratioHeight: number;
    ratioWidth: number;
};
declare const FullscreenVideoBg: FunctionComponent<FullscreenVideoBgProps>;
export default FullscreenVideoBg;
