import SbEditable from 'storyblok-react'
import useForm from '../../utils/hooks/hubspotForm'
import { createElement, Fragment, FunctionComponent } from 'react'
import Paragraph from '../paragraph/Paragraph'
import Components from 'components/index'
import clsx from 'clsx'
import FormSelect from './FormSelect'
import FormCheckbox from './FormCheckbox'
import FormTextfield from './FormTextfield'
import FormSubmitButton from './FormSubmitButton'
import { FormStoryblok } from '../../typings/generated/components-schema'

const ParagraphElement = (content) => Paragraph({ content })

const FormComponents = {
  'form_textfield': FormTextfield,
  'button': FormSubmitButton,
  'form_checkbox': FormCheckbox,
  'form_select': FormSelect,
  'paragraph': ParagraphElement
}

const FormItem = (blok) => {
  if (typeof FormComponents[blok.component] !== 'undefined') {
    return createElement(FormComponents[blok.component], blok)
  }
  console.log('component not found on blok: ', blok)
  console.log('Storyblok PREVIEW and PUBLIC key: ', process.env.STORYBLOK_PREVIEW, process.env.STORYBLOK_PUBLIC)
  return createElement(() => (
    <div>The component {blok.component} has not been created yet.</div>
  ), { key: blok._uid })
}

const Form: FunctionComponent<{ content: FormStoryblok, customData?: any }> = ({ content, customData = {}, children }) => {
  const body = content.body || []
  const responseBody = content.success_body || []
  const opts = {
    api: content.api
  }

  const { data, isLoading, isError, handleSubmit } = useForm(opts)

  const border = content.border || []

  const formClassName = clsx('lm-form', {
    ['lm-form__shaped']: border.includes('shaped'),
    ['lm-form__square']: border.includes('square')
  })

  const onSubmit = (e) => {
    e.preventDefault()
    // debugger
    if (isLoading) return
    const form = e.target
    const elements = [...form.elements]
    let isHoneyed = false
    elements.forEach(element => {
      element.focus()
      if (element.id === 'field_name_first') {
        isHoneyed = element.value.length > 0
      }
      // element.blur()
      // element.checkValidity()
    })
    const valid = form.checkValidity()
    if (!valid || isHoneyed) {
      return
    }
    handleSubmit(e, customData)
  }

  if (!!data) {
    return (
      <div>
        {!responseBody.length && 'Submit is done but add better some success body in Storyblok..'}
        {responseBody.map(item => Components(item))}
      </div>
    )
  }

  return (
    <SbEditable content={content}>
      <form noValidate onSubmit={onSubmit} className={formClassName}>
        <div style={{ opacity: 0, top: 0, left: '-9999px', position: 'absolute' }}>
          <label htmlFor="field_name_first">Street</label>
          <input type="text" id="field_name_first" name="First" />
        </div>
        {isError && (
          <div>Form submit has error...</div>
        )}
        {body.map((item, i) => {
          return (
            <Fragment key={item._uid}>
              {i === body.length - 1 && children && children.map((f, q) => (
                <div className="mb-2" key={'kids__' + q + 1}>
                  {f}
                </div>
              ))}
              <div className="mb-2">
                {FormItem({
                  ...item,
                  border: border || [],
                  errorMsgRequired: content.error_msg_required,
                  errorMsgEmail: content.error_msg_email,
                  isLoading
                })}
              </div>
            </Fragment>
          )
        })}
      </form>
    </SbEditable>
  )
}

export default Form
