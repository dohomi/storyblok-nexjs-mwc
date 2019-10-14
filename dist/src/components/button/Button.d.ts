import { ButtonProps } from '@rmwc/button';
import { IconButtonProps } from '@rmwc/icon-button';
import { FabProps } from '@rmwc/fab';
import { FunctionComponent } from 'react';
import { ButtonStoryblok } from '../../typings/generated/components-schema';
interface MuiButtonProps extends ButtonProps, IconButtonProps, FabProps {
    className?: string;
    [k: string]: any;
}
export declare const mapButtonProps: (content: ButtonStoryblok) => MuiButtonProps;
declare const MtButton: FunctionComponent<{
    content: ButtonStoryblok;
}>;
export default MtButton;
