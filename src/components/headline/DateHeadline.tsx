import { default as React, FunctionComponent } from 'react'
import { DateHeadlineStoryblok, HeadlineStoryblok } from '../../typings/generated/components-schema'
import Headline from './Headline'

const DateHeadline: FunctionComponent<{ content: DateHeadlineStoryblok }> = ({ content }) => {
  const modifContent = {
    ...content,
    text: content.text?.replace('{date}', `${new Date().getFullYear()}`),
    text_xs: content.text_xs?.replace('{date}', `${new Date().getFullYear()}`)
  }
  return (
    <Headline content={modifContent as unknown as HeadlineStoryblok} />
  )
}
export default DateHeadline
