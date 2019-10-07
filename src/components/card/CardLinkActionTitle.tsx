import {Typography} from '@rmwc/typography'

const CardListActionTitles = (content) => {
  const titleStyles = {}
  if (content.variant && content.variant.includes('title_top')) {
    titleStyles.position = 'absolute'
    titleStyles.top = '16px'
  }
  return (
    <div>
      {content.title && <Typography tag={content.titleTag || 'h3'}
                                    style={titleStyles}
                                    className={content.titleClassName}
                                    use={content.titleTypography || 'headline6'}>{content.title}</Typography>}
      {content.subtitle && <Typography tag={content.subtitleTag || 'h4'}
                                       className={content.subtitleClassName}
                                       use={content.subtitleTypography || 'subtitle2'}>{content.subtitle}</Typography>}
    </div>
  )
}
export default CardListActionTitles
