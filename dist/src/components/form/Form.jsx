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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import SbEditable from 'storyblok-react';
import useForm from './useForm';
import { createElement, Fragment } from 'react';
import Paragraph from '../paragraph/Paragraph';
import Components from 'components';
import clsx from 'clsx';
import FormSelect from './FormSelect';
import FormCheckbox from './FormCheckbox';
import FormTextfield from './FormTextfield';
import FormSubmitButton from './FormSubmitButton';
var ParagraphElement = function (content) { return Paragraph({ content: content }); };
var FormComponents = {
    'form_textfield': FormTextfield,
    'button': FormSubmitButton,
    'form_checkbox': FormCheckbox,
    'form_select': FormSelect,
    'paragraph': ParagraphElement
};
var FormItem = function (blok) {
    if (typeof FormComponents[blok.component] !== 'undefined') {
        return createElement(FormComponents[blok.component], blok);
    }
    console.log('component not found on blok: ', blok);
    console.log('Storyblok PREVIEW and PUBLIC key: ', process.env.STORYBLOK_PREVIEW, process.env.STORYBLOK_PUBLIC);
    return createElement(function () { return (<div>The component {blok.component} has not been created yet.</div>); }, { key: blok._uid });
};
var Form = function (_a) {
    var _b;
    var content = _a.content, _c = _a.customData, customData = _c === void 0 ? {} : _c, children = _a.children;
    var body = content.body || [];
    var responseBody = content.success_body || [];
    var opts = {
        api: content.api
    };
    var _d = useForm(opts), data = _d.data, isLoading = _d.isLoading, isError = _d.isError, handleSubmit = _d.handleSubmit;
    var border = content.border || [];
    var formClassName = clsx('lm-form', (_b = {},
        _b['lm-form__shaped'] = border.includes('shaped'),
        _b['lm-form__square'] = border.includes('square'),
        _b));
    var onSubmit = function (e) {
        e.preventDefault();
        // debugger
        if (isLoading)
            return;
        var form = e.target;
        var elements = __spread(form.elements);
        var isHoneyed = false;
        elements.forEach(function (element) {
            var el = element;
            el.focus();
            if (element.id === 'field_name_first') {
                isHoneyed = el.value.length > 0;
            }
            // element.blur()
            // element.checkValidity()
        });
        var valid = form.checkValidity();
        if (!valid || isHoneyed) {
            return;
        }
        handleSubmit && handleSubmit(e, customData);
    };
    if (!!data) {
        return (<div>
        {!responseBody.length && 'Submit is done but add better some success body in Storyblok..'}
        {responseBody.map(function (item) { return Components(item); })}
      </div>);
    }
    return (<SbEditable content={content}>
      <form noValidate onSubmit={onSubmit} className={formClassName}>
        <div style={{ opacity: 0, top: 0, left: '-9999px', position: 'absolute' }}>
          <label htmlFor="field_name_first">Street</label>
          <input type="text" id="field_name_first" name="First"/>
        </div>
        {isError && (<div>Form submit has error...</div>)}
        {body.map(function (item, i) {
        return (<Fragment key={item._uid}>
              {i === body.length - 1 && Array.isArray(children) && children.map(function (f, q) { return (<div className="mb-2" key={'kids__' + q + 1}>
                  {f}
                </div>); })}
              <div className="mb-2">
                {FormItem(__assign(__assign({}, item), { border: border || [], errorMsgRequired: content.error_msg_required, errorMsgEmail: content.error_msg_email, isLoading: isLoading }))}
              </div>
            </Fragment>);
    })}
      </form>
    </SbEditable>);
};
export default Form;
