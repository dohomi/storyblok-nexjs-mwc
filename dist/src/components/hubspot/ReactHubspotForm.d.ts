import { FunctionComponent } from 'react';
import { HubspotFormStoryblok } from '../../typings/generated/components-schema';
declare type FormProps = HubspotFormStoryblok & {
    loading?: boolean;
    onSubmit?: Function;
    onReady?: Function;
    noScript?: boolean;
};
declare const HubspotForm: FunctionComponent<FormProps>;
export default HubspotForm;
