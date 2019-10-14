import { CSSProperties } from 'react';
declare const backgroundPropertyHelper: (properties: any[]) => {
    image?: undefined;
    styles?: undefined;
    classNames?: undefined;
    classes?: undefined;
    imageProperties?: undefined;
    focalPoint?: undefined;
} | {
    image: string | undefined;
    styles: CSSProperties;
    classNames: any[] | undefined;
    classes: {
        [x: string]: boolean;
    };
    imageProperties: "disable_lazy_load"[];
    focalPoint: string | undefined;
};
export default backgroundPropertyHelper;
