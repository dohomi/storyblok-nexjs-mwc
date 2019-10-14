import { Typography } from '@rmwc/typography';
var CardListActionTitles = function (content) {
    var titleStyles = {};
    if (content.variant && content.variant.includes('title_top')) {
        titleStyles.position = 'absolute';
        titleStyles.top = '16px';
    }
    return (<div>
      {content.title && <Typography tag={content.title_tag || 'h3'} style={titleStyles} className={content.titleClassName} use={content.title_typography || 'headline6'}>{content.title}</Typography>}
      {content.subtitle && <Typography tag={content.subtitle_tag || 'h4'} className={content.subtitleClassName} use={content.subtitle_typography || 'subtitle2'}>{content.subtitle}</Typography>}
    </div>);
};
export default CardListActionTitles;
