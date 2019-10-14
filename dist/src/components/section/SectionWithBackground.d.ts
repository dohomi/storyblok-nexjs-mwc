import { FunctionComponent } from 'react';
declare type SectionWithBackgroundProps = {
    isColumn?: boolean;
    containerProps: any;
    style: any;
    background_style?: string;
    className: string[] | string;
    isFullHeight?: boolean;
};
declare const WithBackgroundImage: FunctionComponent<SectionWithBackgroundProps>;
export default WithBackgroundImage;
