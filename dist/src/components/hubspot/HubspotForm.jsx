var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import SbEditable from 'storyblok-react';
import cookie from 'js-cookie';
import dynamic from 'next/dynamic';
import { Checkbox } from '@rmwc/checkbox';
import { CircularProgress } from '@rmwc/circular-progress';
import Form from '../form/Form';
import FormCheckbox from '../form/FormCheckbox';
import Paragraph from '../paragraph/Paragraph';
var HubspotFormDyn = dynamic(function () { return import('./ReactHubspotForm'); }, { ssr: false });
var HubspotFormCustom = function (_a) {
    var content = _a.content;
    var opts = {
        portalId: content.portal_id,
        formId: content.form_id
    };
    var body = content.body || [];
    var data = {
        context: {
            hutk: cookie.get('hubspotutk'),
            pageUri: typeof document !== 'undefined' && document.location.href
        },
        legalConsentOptions: {
            consent: undefined,
            legitimateInterest: undefined
        }
    };
    var children = [];
    var subscriptionTypeId = Number(content.newsletter_subscription);
    if (content.consent_process || content.consent_communication) {
        // @ts-ignore
        data.legalConsentOptions.consent = {
            consentToProcess: true,
            text: content.consent_process,
            communications: [{
                    value: false,
                    // Boolean; Whether or not the visitor checked the checkbox for this subscription type.
                    subscriptionTypeId: subscriptionTypeId,
                    // Integer; The ID of the specific subscription type
                    text: content.consent_communication
                    // String; The text displayed to the visitor for this specific subscription checkbox
                }]
        };
        var onCommunicationChange = function (ev) {
            var isChecked = ev.target.checked;
            // @ts-ignore
            data.legalConsentOptions.consent.communications[0].value = !!isChecked;
        };
        content.consent_process && children.push(<FormCheckbox label={content.consent_process} required={true} component="form_checkbox" name={'__consent_process'} _uid={'consent_process'}/>);
        content.consent_communication && children.push(<Checkbox label={content.consent_communication} name={'__consent_communication'} id={'consent_communication'} value={subscriptionTypeId} onChange={onCommunicationChange}/>);
    }
    else if (content.legitimate_interest && content.legitimate_interest.length) {
        var legitimateProps = content.legitimate_interest[0];
        // @ts-ignore
        data.legalConsentOptions.legitimateInterest = {
            value: true,
            subscriptionTypeId: subscriptionTypeId,
            text: legitimateProps.text
        };
        console.log('some props for legitimate', legitimateProps);
        children.push(Paragraph({ content: legitimateProps }));
    }
    var formProps = __assign(__assign({}, body[0]), { api: "https://api.hsforms.com/submissions/v3/integration/submit/" + opts.portalId + "/" + opts.formId });
    return (<SbEditable content={content}>
      <Form content={formProps} customData={data} children={children}/>
    </SbEditable>);
};
var HubspotForm = function (_a) {
    var content = _a.content;
    var opts = {
        portalId: content.portal_id,
        formId: content.form_id
    };
    var body = content.body || [];
    if (body && body.length) {
        return <HubspotFormCustom content={content}/>;
    }
    return (<SbEditable content={content}>
      <HubspotFormDyn {...opts} _uid={content._uid} loading={<CircularProgress />}/>
    </SbEditable>);
};
export default HubspotForm;
