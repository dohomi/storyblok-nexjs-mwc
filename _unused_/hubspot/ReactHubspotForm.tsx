import { FunctionComponent, useEffect, useState } from 'react'
import { HubspotFormStoryblok } from '../../typings/generated/components-schema'

type FormProps = HubspotFormStoryblok & {
  loading?: boolean
  onSubmit?: Function
  onReady?: Function
  noScript?: boolean
}

const HubspotForm: FunctionComponent<FormProps> = (props) => {
  let el: HTMLDivElement

  let [loaded, setLoaded] = useState(false)

  useEffect(
    () => {
      // @ts-ignore
      if (!window['hbspt'] && !props.noScript) {
        loadScript()
      } else {
        createForm()
        // findFormElement()
      }
    },
    []
  )

  function createForm() {
    // @ts-ignore
    if (window['hbspt']) {
      // @ts-ignore
      window['jQuery'] = window['jQuery'] || (() => ({
        // these are all methods required by HubSpot
        change: () => {
        },
        trigger: () => {
        }
      }))
      // protect against component unmounting before window.hbspt is available
      if (el === null) {
        return
      }


      let currentProps: FormProps = {
        ...props
      }
      delete currentProps.loading
      delete currentProps.onSubmit
      delete currentProps.onReady
      let options = {
        ...currentProps,
        target: `#${el.getAttribute(`id`)}`,
        onFormReady: () => {
          setLoaded(true)
          // const formData = $form.serializeArray()
          props.onReady && props.onReady(el)
        },
        onFormSubmit: () => {
          // https://integrate.hubspot.com/t/form-callback-throws-unrelated-jquery-error/77/7
          // ref: https://developers.hubspot.com/docs/methods/forms/advanced_form_options
          props.onSubmit && props.onSubmit(el)
        }
      }
      // @ts-ignore
      window.hbspt.forms.create(options)
      return true
    } else {
      return setTimeout(createForm, 1)
    }
  }

  function loadScript() {
    let script = document.createElement(`script`)
    script.defer = true
    script.onload = () => {
      createForm()
      // findFormElement()
    }
    script.src = `//js.hsforms.net/forms/v2.js`
    document.head.appendChild(script)
  }

  // function findFormElement () {
  //   // protect against component unmounting before form is added
  //   if (el === null) {
  //     return
  //   }
  //   let form = el.querySelector(`iframe`)
  //   if (form) {
  //     setLoaded(true)
  //     if (props.onReady) {
  //       props.onReady(form)
  //     }
  //   } else {
  //     setTimeout(findFormElement, 1)
  //   }
  // }

  return (
    <div>
      <div
        ref={(element) => el = element as HTMLDivElement}
        id={`reactHubspotForm_${props._uid}`}
        style={{ display: loaded ? 'block' : 'none' }}
      />
      {!loaded && props.loading}
      <style jsx global>{`
              .hs-button-reset,
        .hs-form .hs-button {
        border: none;
        line-height: 1;
        margin: 0;
        outline: 0;
        padding: 0
      }

        .base-hs-button-styles,
        .hs-form .hs-button {
        text-decoration: none;
        cursor: pointer;
        display: inline-block;
        font-size: 12px;
        font-weight: 700;
        line-height: 12px;
        padding: 7px 18px 7px;
        position: relative;
        text-align: center
      }

        .base-hs-button-styles:hover,
        .hs-form .hs-button:hover {
        text-decoration: none
      }

        input.hs-input[type=checkbox],
        input.hs-input[type=radio] {
        cursor: pointer
      }

        input.hs-input,
        textarea.hs-input,
        select.hs-input {
        display: inline-block;
        width: 210px;
        height: 18px;
        padding: 4px;
        font-size: 13px;
        font-weight: normal;
        line-height: 18px;
        color: #666;
        border: 1px solid #ccc;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        -ms-border-radius: 3px;
        border-radius: 3px
      }

        textarea.hs-input {
        padding-top: 5px
      }

        html.webkit textarea.hs-input {
        padding-top: 6px;
        padding-left: 5px
      }

        input.hs-input[type=checkbox],
        input.hs-input[type=radio] {
        width: auto;
        height: auto;
        padding: 0;
        margin: 3px 0;
        line-height: normal;
        border: none
      }

        input.hs-input[type=file] {
        background-color: #fff;
        padding: initial;
        border: initial;
        line-height: initial;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none
      }

        input.hs-input[type=button],
        input.hs-input[type=reset],
        input.hs-input[type=submit] {
        width: auto;
        height: auto
      }

        input.hs-input[type=search] {
        -webkit-border-radius: 16px;
        -moz-border-radius: 16px;
        -ms-border-radius: 16px;
        border-radius: 16px;
        background-image: url('/common_assets/static-2.158/img/form/search.png');
        background-repeat: no-repeat;
        padding-left: 26px;
        padding-right: 6px;
        padding-top: 5px;
        padding-bottom: 3px;
        background-position: 8px 8px
      }

        html.firefox input.hs-input[type=search] {
        position: relative;
        top: 1px
      }

        input.hs-input[type=search].transparent-image {
        background-image: url('/common_assets/static-2.158/img/form/search-transparent.png')
      }

        input.hs-input[type="search"]::-webkit-search-decoration,
        input.hs-input[type="search"]::-webkit-search-cancel-button,
        input.hs-input[type="search"]::-webkit-search-results-button,
        input.hs-input[type="search"]::-webkit-search-results-decoration {
        display: none
      }

        select.hs-input,
        input.hs-input[type=file] {
        height: 27px
      }

        select[multiple].hs-input {
        height: inherit
      }

        textarea.hs-input {
        height: auto
      }

        .hs-input:-moz-placeholder {
        color: #bfbfbf
      }

        .hs-input::-webkit-input-placeholder {
        color: #bfbfbf
      }

        input.hs-input,
        textarea.hs-input {
        -webkit-transition: border 0.2s linear, box-shadow 0.2s linear;
        -moz-transition: border 0.2s linear, box-shadow 0.2s linear;
        transition: border 0.2s linear, box-shadow 0.2s linear;
        -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1)
      }

        input.hs-input:focus,
        textarea.hs-input:focus {
        outline: none;
        border-color: rgba(82, 168, 236, 0.8);
        -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
        -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6)
      }

        input.hs-input.error,
        .hs-form div.field.error input,
        .hs-form div.field.error textarea,
        .hs-form div.field.error .chzn-choices,
        textarea.hs-input.error {
        border-color: #c87872;
        -webkit-box-shadow: 0 0 3px rgba(171, 41, 32, 0.25);
        -moz-box-shadow: 0 0 3px rgba(171, 41, 32, 0.25);
        box-shadow: 0 0 3px rgba(171, 41, 32, 0.25)
      }

        input.hs-input.error:focus,
        .hs-form div.field.error input:focus,
        .hs-form div.field.error textarea:focus,
        .hs-form div.field.error .chzn-choices:focus,
        textarea.hs-input.error:focus {
        border-color: #b9554d;
        -webkit-box-shadow: 0 0 6px rgba(171, 41, 32, 0.5);
        -moz-box-shadow: 0 0 6px rgba(171, 41, 32, 0.5);
        box-shadow: 0 0 6px rgba(171, 41, 32, 0.5)
      }

        .input-mini.hs-input,
        input.mini.hs-input,
        textarea.mini.hs-input,
        select.mini.hs-input {
        width: 60px
      }

        .input-small.hs-input,
        input.small.hs-input,
        textarea.small.hs-input,
        select.small.hs-input {
        width: 90px
      }

        .input-medium.hs-input,
        input.medium.hs-input,
        textarea.medium.hs-input,
        select.medium.hs-input {
        width: 150px
      }

        .input-large.hs-input,
        input.large.hs-input,
        textarea.large.hs-input,
        select.large.hs-input {
        width: 210px
      }

        .input-xlarge.hs-input,
        input.xlarge.hs-input,
        textarea.xlarge.hs-input,
        select.xlarge.hs-input {
        width: 270px
      }

        .input-xxlarge.hs-input,
        input.xxlarge.hs-input,
        textarea.xxlarge.hs-input,
        select.xxlarge.hs-input {
        width: 530px
      }

        .input-stretch.hs-input,
        input.stretch.hs-input,
        textarea.stretch.hs-input,
        select.stretch.hs-input {
        box-sizing: border-box;
        width: 100%
      }

        textarea.hs-input.xxlarge {
        overflow-y: auto
      }

        input.hs-input.span1,
        textarea.hs-input.span1,
        select.hs-input.span1 {
        display: inline-block;
        float: none;
        width: 30px;
        margin-left: 0
      }

        input.hs-input.span2,
        textarea.hs-input.span2,
        select.hs-input.span2 {
        display: inline-block;
        float: none;
        width: 90px;
        margin-left: 0
      }

        input.hs-input.span3,
        textarea.hs-input.span3,
        select.hs-input.span3 {
        display: inline-block;
        float: none;
        width: 150px;
        margin-left: 0
      }

        input.hs-input.span4,
        textarea.hs-input.span4,
        select.hs-input.span4 {
        display: inline-block;
        float: none;
        width: 210px;
        margin-left: 0
      }

        input.hs-input.span5,
        textarea.hs-input.span5,
        select.hs-input.span5 {
        display: inline-block;
        float: none;
        width: 270px;
        margin-left: 0
      }

        input.hs-input.span6,
        textarea.hs-input.span6,
        select.hs-input.span6 {
        display: inline-block;
        float: none;
        width: 330px;
        margin-left: 0
      }

        input.hs-input.span7,
        textarea.hs-input.span7,
        select.hs-input.span7 {
        display: inline-block;
        float: none;
        width: 390px;
        margin-left: 0
      }

        input.hs-input.span8,
        textarea.hs-input.span8,
        select.hs-input.span8 {
        display: inline-block;
        float: none;
        width: 450px;
        margin-left: 0
      }

        input.hs-input.span9,
        textarea.hs-input.span9,
        select.hs-input.span9 {
        display: inline-block;
        float: none;
        width: 510px;
        margin-left: 0
      }

        input.hs-input.span10,
        textarea.hs-input.span10,
        select.hs-input.span10 {
        display: inline-block;
        float: none;
        width: 570px;
        margin-left: 0
      }

        input.hs-input.span11,
        textarea.hs-input.span11,
        select.hs-input.span11 {
        display: inline-block;
        float: none;
        width: 630px;
        margin-left: 0
      }

        input.hs-input.span12,
        textarea.hs-input.span12,
        select.hs-input.span12 {
        display: inline-block;
        float: none;
        width: 690px;
        margin-left: 0
      }

        input.hs-input.span13,
        textarea.hs-input.span13,
        select.hs-input.span13 {
        display: inline-block;
        float: none;
        width: 750px;
        margin-left: 0
      }

        input.hs-input.span14,
        textarea.hs-input.span14,
        select.hs-input.span14 {
        display: inline-block;
        float: none;
        width: 810px;
        margin-left: 0
      }

        input.hs-input.span15,
        textarea.hs-input.span15,
        select.hs-input.span15 {
        display: inline-block;
        float: none;
        width: 870px;
        margin-left: 0
      }

        input.hs-input.span16,
        textarea.hs-input.span16,
        select.hs-input.span16 {
        display: inline-block;
        float: none;
        width: 930px;
        margin-left: 0
      }

        input.hs-input[disabled],
        select.hs-input[disabled],
        textarea.hs-input[disabled] {
        background-color: #f5f5f5;
        border-color: #ddd;
        cursor: not-allowed
      }

        .help-inline,
        .help-block {
        font-size: 11px;
        line-height: 18px;
        color: #818181
      }

        .help-inline {
        padding-left: 5px
      }

        .help-block {
        display: block;
        max-width: 600px
      }

        .inline-inputs {
        color: #818181
      }

        .inline-inputs span,
        .inline-inputs input {
        display: inline-block
      }

        .inline-inputs input.mini {
        width: 60px
      }

        .inline-inputs input.small {
        width: 90px
      }

        .inline-inputs span {
        padding: 0 2px 0 1px
      }

        .input-prepend input,
        .input-append input {
        -webkit-border-radius: 0 3px 3px 0;
        -moz-border-radius: 0 3px 3px 0;
        -ms-border-radius: 0 3px 3px 0;
        border-radius: 0 3px 3px 0
      }

        .input-prepend .add-on,
        .input-append .add-on {
        position: relative;
        background: #f5f5f5;
        border: 1px solid #ccc;
        z-index: 2;
        float: left;
        display: block;
        width: auto;
        min-width: 16px;
        height: 18px;
        padding: 4px 4px 4px 5px;
        margin-right: -1px;
        font-weight: normal;
        line-height: 18px;
        color: #bfbfbf;
        text-align: center;
        text-shadow: 0 1px 0 #fff;
        -webkit-border-radius: 3px 0 0 3px;
        -moz-border-radius: 3px 0 0 3px;
        -ms-border-radius: 3px 0 0 3px;
        border-radius: 3px 0 0 3px
      }

        .input-prepend .active,
        .input-append .active {
        background: #bfe0bf;
        border-color: #59ad59
      }

        .input-append input {
        float: left;
        -webkit-border-radius: 3px 0 0 3px;
        -moz-border-radius: 3px 0 0 3px;
        -ms-border-radius: 3px 0 0 3px;
        border-radius: 3px 0 0 3px
      }

        .input-append .add-on {
        -webkit-border-radius: 0 3px 3px 0;
        -moz-border-radius: 0 3px 3px 0;
        -ms-border-radius: 0 3px 3px 0;
        border-radius: 0 3px 3px 0;
        margin-right: 0;
        margin-left: -1px
      }

        .hs-form {
        margin-bottom: 18px
      }

        .hs-form fieldset {
        margin-bottom: 18px;
        padding-top: 18px
      }

        .hs-form fieldset legend {
        display: block;
        margin-left: 150px;
        font-size: 19.5px;
        line-height: 1;
        color: #414141
      }

        .hs-form .clearfix,
        .hs-form .field,
        .hs-form .hs-form-field {
        margin-bottom: 18px
      }

        .hs-form .clearfix:after,
        .hs-form .field:after,
        .hs-form .hs-form-field:after {
        content: '';
        display: table;
        clear: both
      }

        .hs-form label {
        padding-top: 5px;
        font-size: 13px;
        line-height: 18px;
        font-weight: bold;
        float: left;
        width: 130px;
        text-align: right;
        color: #414141
      }

        .hs-form .input {
        margin-left: 150px
      }

        .hs-form div.field.error {
        background: #fae5e3;
        padding: 6px 0;
        margin-bottom: 18px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        -ms-border-radius: 4px;
        border-radius: 4px
      }

        .hs-form div.field.error>label,
        .hs-form div.field.error span.help-inline,
        .hs-form div.field.error span.help-block {
        color: #9d261d
      }

        .hs-form div.field.error .input-prepend span.add-on,
        .hs-form div.field.error .input-append span.add-on {
        background: #f4c8c5;
        border-color: #c87872;
        color: #b9554d
      }

        .hs-form .hsErrMsgContainer ul {
        margin-top: 6px;
        margin-bottom: 0px;
        margin-left: 7px;
        list-style: none
      }

        .hs-form .hsErrMsgContainer ul li {
        font-size: 12px;
        color: #a44e47
      }

        .hs-form .hsErrMsgContainer .hs-block-message {
        min-width: 200px;
        width: 200px
      }

        .hs-form .hsErrMsgContainer .hs-block-message ul {
        margin-top: 0px
      }

        .hs-form .actions {
        background: #f5f5f5;
        margin-top: 18px;
        margin-bottom: 18px;
        padding: 17px 20px 18px 150px;
        border-top: 1px solid #ddd;
        -webkit-border-radius: 0 0 3px 3px;
        -moz-border-radius: 0 0 3px 3px;
        -ms-border-radius: 0 0 3px 3px;
        border-radius: 0 0 3px 3px
      }

        .hs-form .actions .secondary-action {
        float: right
      }

        .hs-form .actions .secondary-action a {
        line-height: 30px
      }

        .hs-form .actions .secondary-action a:hover {
        text-decoration: underline
      }

        .hs-form .inputs-list {
        margin: 0 0 5px;
        width: 100%
      }

        .hs-form .inputs-list>li {
        display: block;
        padding: 0;
        width: 100%
      }

        .hs-form .inputs-list label {
        display: block;
        float: none;
        width: auto;
        padding: 0;
        line-height: 18px;
        text-align: left;
        white-space: normal;
        font-weight: normal
      }

        .hs-form .inputs-list label strong {
        color: #818181
      }

        .hs-form .inputs-list label small {
        font-size: 11px;
        font-weight: normal
      }

        .hs-form .inputs-list .inputs-list {
        margin-left: 25px;
        margin-bottom: 10px;
        padding-top: 0
      }

        .hs-form .inputs-list:first-child {
        padding-top: 6px
      }

        .hs-form .inputs-list>li+li {
        padding-top: 2px
      }

        .hs-form .inputs-list input[type=radio],
        .hs-form .inputs-list input[type=checkbox] {
        margin-bottom: 0
      }

        .hs-form.stacked {
        padding-left: 20px
      }

        .hs-form.stacked fieldset {
        padding-top: 9px
      }

        .hs-form.stacked legend {
        margin-left: 0
      }

        .hs-form.stacked label {
        display: block;
        float: none;
        width: auto;
        font-weight: bold;
        text-align: left;
        line-height: 20px;
        padding-top: 0;
        margin-bottom: 4px
      }

        .hs-form.stacked .field {
        margin-bottom: 18px
      }

        .hs-form.stacked .field div.input {
        margin-left: 0
      }

        .hs-form.stacked .field div.input>input+a,
        .hs-form.stacked .field div.input select+a,
        .hs-form.stacked .field div.input textarea+a {
        margin-top: 4px;
        display: block
      }

        .hs-form.stacked .inputs-list {
        margin-bottom: 0
      }

        .hs-form.stacked .inputs-list>li {
        padding-top: 0
      }

        .hs-form.stacked .inputs-list>li label {
        font-weight: normal;
        padding-top: 0
      }

        .hs-form.stacked div.error {
        padding: 3px 10px 6px;
        margin-top: 0;
        margin-left: -10px;
        margin-bottom: 9px
      }

        .hs-form.stacked .actions {
        margin-left: -20px;
        padding-left: 20px
      }

        .hs-form {
        padding-left: 0px
      }

        .hs-form.stacked {
        padding-left: 0px
      }

        .hs-form.stacked fieldset {
        padding: 0
      }

        .hs-form .hs-button {
        color: #fff;
        text-shadow: 0 -1px 0 #3574e3;
        background-color: #3574e3;
        background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #7ec8f4), color-stop(100%, #3574e3));
        background-image: -webkit-linear-gradient(top, #7ec8f4, #3574e3);
        background-image: -moz-linear-gradient(top, #7ec8f4, #3574e3);
        background-image: linear-gradient(top, #7ec8f4, #3574e3);
        box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.5);
        border-top: 1px solid #64baf0;
        border-bottom: 1px solid #1c4ed5;
        border-right: 1px solid #468ee6;
        border-left: 1px solid #468ee6;
        border-radius: 4px;
        -webkit-transition: opacity 0.15s linear;
        -moz-transition: opacity 0.15s linear;
        transition: opacity 0.15s linear;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none
      }

        .hs-form .hs-button:visited,
        .hs-form .hs-button:hover {
        color: #fff
      }

        .hs-form .hs-button:hover:not(.inactive),
        .hs-form .hs-button:focus:not(.inactive),
        .hs-form .hs-button.hovered:not(.inactive) {
        box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.5), 0 0 5px #3574e3;
        border-top: 1px solid #4db0ee;
        border-bottom: 1px solid #1946be;
        border-right: 1px solid #3080e3;
        border-left: 1px solid #3080e3
      }

        .hs-form .hs-button:active:not(.inactive):not(.link),
        .hs-form .hs-button.depressed:not(.inactive):not(.link),
        .dropdown-open>.hs-form .hs-button:not(.inactive):not(.link) {
        background-color: #599eeb;
        background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #3574e3), color-stop(100%, #599eeb));
        background-image: -webkit-linear-gradient(top, #3574e3, #599eeb);
        background-image: -moz-linear-gradient(top, #3574e3, #599eeb);
        background-image: linear-gradient(top, #3574e3, #599eeb);
        box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.3), inset 0px -1px 0px rgba(255, 255, 255, 0.3);
        border-top: 1px solid #1c4ed5;
        border-bottom: 1px solid #4084e2;
        border-right: 1px solid #468ee6;
        border-left: 1px solid #468ee6
      }

        .dropdown-open>.hs-form .hs-button:not(.inactive):not(.link) {
        box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.3)
      }

        .hs-form .hs-button.disabled.disabled.disabled.disabled,
        .hs-form .hs-button[disabled][disabled][disabled] {
        background-color: #6387c5;
        background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #88b1ce), color-stop(100%, #6387c5));
        background-image: -webkit-linear-gradient(top, #88b1ce, #6387c5);
        background-image: -moz-linear-gradient(top, #88b1ce, #6387c5);
        background-image: linear-gradient(top, #88b1ce, #6387c5);
        box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0);
        border-top: 1px solid #7baacc;
        border-bottom: 1px solid #5774be;
        border-right: 1px solid #6c94c7;
        border-left: 1px solid #6c94c7;
        cursor: default;
        color: #ededed;
        text-shadow: none;
        opacity: 0.6
      }

        .hs-form .hs-button.disabled.disabled.disabled.disabled.next:before,
        .hs-form .hs-button[disabled][disabled][disabled].next:before {
        opacity: 0.5
      }

        .hs-form .hs-button.disabled.disabled.disabled.disabled.previous:before,
        .hs-form .hs-button[disabled][disabled][disabled].previous:before {
        opacity: 0.5
      }

        .hs-form .hs-button.next:before,
        .hs-form .hs-button.previous:before {
        background: url(/style_guide/static-8.319/img/hs-button-arrows.png) center 0 no-repeat;
        display: block;
        width: 16px;
        height: 16px;
        position: absolute;
        top: 5px;
        content: ' ';
        z-index: 99
      }

        .hs-form .hs-button.next {
        padding-right: 32px
      }

        .hs-form .hs-button.next:before {
        right: 9px
      }

        .hs-form .hs-button.previous {
        padding-left: 32px
      }

        .hs-form .hs-button.previous:before {
        background-position: center -16px;
        left: 9px
      }

        .hs-form .hs-button.inactive {
        cursor: default
      }

        .hs-form ul {
        list-style: none
      }

        .hs-form label.hidden {
        display: none
      }

        .hs-form .hs-field-desc {
        color: #aaa;
        margin: 0px 0px 5px 150px;
        font-size: 11px;
      }

        .hs-form .hs-form-required {
        color: red
      }

        .hs-form .field {
        margin-bottom: 9px
      }

        .hs-form .hs-richtext {
        margin-bottom: 3px;
        line-height: 18px;
        font-size: 14px;
        color: #414141
      }

        .hs-form .hs-richtext hr {
        text-align: left;
        margin-left: 0;
        width: 91%
      }

        .hs-form .email-correction,
        .hs-form .email-validation {
        padding-top: 3px;
        font-size: 12px;
      }

        .hs-form .email-correction a,
        .hs-form .email-validation a {
        cursor: pointer
      }

        .hs-form .inputs-list {
        padding-left: 5px;
        list-style: none
      }

        .hs-form .inputs-list li input {
        margin: 3px 5px 3px 0px
      }

        .hs-form input[type=checkbox],
        .hs-form input[type=radio] {
        margin-right: 5px
      }

        .hs-form input:not([type="image"]),
        .hs-form textarea {
        box-sizing: content-box
      }

        .hs-form.stacked .hs-field-desc {
        margin: 0px 0px 2px 0px
      }

        .hs-form .hs-input,
        .hs-form textarea.hs-input {
        box-sizing: border-box;
        max-width: 500px;
        width: 90%
      }

        .hs-form .hs-input:not[type=checkbox],
        .hs-form .hs-input:not[type=radio],
        .hs-form textarea.hs-input:not[type=checkbox],
        .hs-form textarea.hs-input:not[type=radio] {
        min-height: 18px;
        min-width: 100px
      }

        .hs-form .actions {
        background: transparent;
        margin-top: 18px;
        margin-bottom: 18px;
        padding: 17px 20px 18px 0px;
        border-top: none;
        -webkit-border-radius: 0 0 3px 3px;
        -moz-border-radius: 0 0 3px 3px;
        -ms-border-radius: 0 0 3px 3px;
        border-radius: 0 0 3px 3px
      }

        .hs-form .actions .secondary-action {
        float: right
      }

        .hs-form .actions .secondary-action a {
        line-height: 30px
      }

        .hs-form .actions .secondary-action a:hover {
        text-decoration: underline
      }

        .pika-single {
        z-index: 9999;
        display: block;
        position: relative;
        color: #333;
        background: #fff;
        border: 1px solid #ccc;
        border-bottom-color: #bbb;
      }

        .pika-single.is-hidden {
        display: none
      }

        .pika-single.is-bound {
        position: absolute;
        box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5)
      }

        .pika-single {
        *zoom: 1
      }

        .pika-single:before,
        .pika-single:after {
        content: ' ';
        display: table
      }

        .pika-single:after {
        clear: both
      }

        .pika-lendar {
        float: left;
        width: 240px;
        margin: 8px
      }

        .pika-title {
        position: relative;
        text-align: center
      }

        .pika-title select {
        cursor: pointer;
        position: absolute;
        z-index: 9998;
        margin: 0;
        left: 0;
        top: 5px;
        filter: alpha(opacity=0);
        opacity: 0
      }

        .pika-label {
        display: inline-block;
        *display: inline;
        position: relative;
        z-index: 9999;
        overflow: hidden;
        margin: 0;
        padding: 5px 3px;
        font-size: 14px;
        line-height: 20px;
        font-weight: bold;
        background-color: #fff
      }

        .pika-prev,
        .pika-next {
        display: block;
        cursor: pointer;
        position: relative;
        outline: none;
        border: 0;
        padding: 0;
        width: 20px;
        height: 30px;
        text-indent: 20px;
        white-space: nowrap;
        overflow: hidden;
        background-color: transparent;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 75% 75%;
        opacity: 0.5;
        *position: absolute;
        *top: 0
      }

        .pika-prev:hover,
        .pika-next:hover {
        opacity: 1
      }

        .pika-prev.is-disabled,
        .pika-next.is-disabled {
        cursor: default;
        opacity: 0.2
      }

        .pika-prev,
        .is-rtl .pika-next {
        float: left;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==');
        *left: 0
      }

        .pika-next,
        .is-rtl .pika-prev {
        float: right;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=');
        *right: 0
      }

        .pika-select {
        display: inline-block;
        *display: inline
      }

        .pika-table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        border: 0
      }

        .pika-table th,
        .pika-table td {
        width: 14.28571%;
        padding: 0
      }

        .pika-table th {
        color: #999;
        font-size: 12px;
        line-height: 25px;
        font-weight: bold;
        text-align: center
      }

        .pika-table abbr {
        border-bottom: none;
        cursor: help
      }

        .pika-button {
        cursor: pointer;
        display: block;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        outline: none;
        border: 0;
        margin: 0;
        width: 100%;
        padding: 5px;
        color: #666;
        font-size: 12px;
        line-height: 15px;
        text-align: right;
        background: #f5f5f5
      }

        .is-today .pika-button {
        color: #3af;
        font-weight: bold
      }

        .is-selected .pika-button {
        color: #fff;
        font-weight: bold;
        background: #3af;
        box-shadow: inset 0 1px 3px #178fe5;
        border-radius: 3px
      }

        .is-disabled .pika-button {
        pointer-events: none;
        cursor: default;
        color: #999;
        opacity: 0.3
      }

        .pika-button:hover {
        color: #fff !important;
        background: #ff8000 !important;
        box-shadow: none !important;
        border-radius: 3px !important
      }

        .pika-week {
        font-size: 11px;
        color: #999
      }

        .hs-form fieldset {
        border: 0;
        padding: 0;
        margin: 0;
        max-width: 500px
      }

        .hs-form fieldset.form-columns-1 .hs-input {
        width: 95%
      }

        .hs-form fieldset.form-columns-1 .input {
        margin-right: 8px
      }

        .hs-form fieldset.form-columns-1 input[type="checkbox"],
        .hs-form fieldset.form-columns-1 input[type="radio"] {
        width: auto
      }

        .hs-form fieldset.form-columns-2 .hs-form-field {
        width: 50%;
        float: left
      }

        .hs-form fieldset.form-columns-2 .input {
        margin-right: 8px
      }

        .hs-form fieldset.form-columns-3 .hs-form-field {
        width: 32.7%;
        float: left
      }

        .hs-form fieldset.form-columns-3 .input {
        margin-right: 8px
      }

        .hs-form fieldset .hs-form-field.hidden-label {
        margin-top: 24px
      }

        .hs-form .hs-social-login {
        border-radius: 3px;
        box-sizing: content-box;
        width: 95%;
        max-width: 480px;
        height: 90px
      }

        .hsformerror {
        margin: 0 0 2px;
        padding: 2px 6px;
        height: auto;
        background-color: #fdd2d0;
        font-size: 11px;
        border: 1px solid #fcb3af;
        padding: 4px 16px 4px 10px;
        color: #000;
        display: none;
        background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #fefefe), color-stop(100%, #fdd2d0));
        background-image: -webkit-linear-gradient(#fefefe, #fdd2d0);
        background-image: -moz-linear-gradient(#fefefe, #fdd2d0);
        background-image: -o-linear-gradient(#fefefe, #fdd2d0);
        background-image: linear-gradient(#fefefe, #fdd2d0);
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        -ms-border-radius: 4px;
        -o-border-radius: 4px;
        border-radius: 4px;
        -webkit-box-shadow: 0 0 6px #ddd;
        -moz-box-shadow: 0 0 6px #ddd;
        box-shadow: 0 0 6px #ddd;
        z-index: 99999
      }

        .hsformerror em {
        border: 10px solid;
        border-color: #fdd2d0 transparent transparent;
        bottom: -17px;
        display: block;
        height: 0;
        left: 60px;
        position: absolute;
        width: 0
      }

        .hsformerror p {
        font-family: Lucida Grande, Lucida Sans Unicode, bitstream vera sans, trebuchet ms, verdana, sans-serif;
        margin: 0;
        float: left;
        margin-right: 8px
      }

        .hsformerror:hover {
        cursor: default
      }

        .hsformerror .close-form-error {
        float: right;
        display: inline;
        top: 3px;
        position: absolute;
        color: #b17c79 !important;
        cursor: pointer !important;
        font-size: 11px !important;
        font-weight: normal !important
      }

        .hsformerror .close-form-error:hover {
        color: #cc8884
      }

        @media (max-width: 400px),
        (min-device-width: 320px) and (max-device-width: 480px) {
        form.hs-form.form-columns-2.hs-form-field,
        form.hs-form .form-columns-3 .hs-form-field {
        float: none;
        width: 100%
      }
        form.hs-form .form-columns-2 .hs-form-field .hs-input,
        form.hs-form .form-columns-3 .hs-form-field .hs-input {
        width: 95%
      }
      }

        @media (max-width: 422px) {
        .all-social-types {
        height: 100px
      }
      }

        @media (max-width: 342px) {
        .hs-social-login {
        height: 72px
      }
      }
      `}
      </style>
    </div>
  )
}

export default HubspotForm
