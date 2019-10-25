import { RteContentProps } from './rte_typings'

const InlineContentMap = {
  bold: 'b',
  strike: 'strike',
  underline: 'u',
  strong: 'strong',
  code: 'code',
  italic: 'i',
  link: 'a',
  styled: 'span'
}

const RteText = ({ content }: { content: RteContentProps }) => {
  if (content.marks && content.marks.length) {
    let textWithHtml = content.marks.map(({ type, attrs }) => {
      let part = `<${InlineContentMap[type]}`
      if (attrs && attrs.href) {
        part += ` href="${attrs.href}"`
      }
      if (attrs && attrs.class) {
        part += ` class="${attrs.class}"`
      }
      return part += '>'
    }).join('')
    textWithHtml += content.text
    textWithHtml += content.marks.reverse().map(({ type }) => `</${InlineContentMap[type]}>`).join('')
    return <span dangerouslySetInnerHTML={{ __html: textWithHtml }} />
  }
  return content.text
}
export default RteText
