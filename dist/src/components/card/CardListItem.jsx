import { CardMediaContent, CardPrimaryAction } from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import clsx from 'clsx';
import CardMediaElement from './CardMediaElement';
import CardWrap from './CardWrap';
import CardListActionTitles from './CardLinkActionTitle';
var CardListItem = function (content) {
    var _a;
    var variant = content.variant || [];
    var cardClasses = clsx((_a = {},
        _a["mdc-elevation--z" + content.elevation] = content.elevation,
        _a));
    var cardStyles = {};
    content.border_radius && (cardStyles.borderRadius = content.border_radius);
    var isOverMedia = variant.includes('over_media');
    var descriptionIsEmpty = isOverMedia && !content.description;
    var cardwrapProps = {
        content: content,
        style: cardStyles,
        className: cardClasses,
        outlined: variant.includes('outlined')
    };
    var cardMediaProps = {
        image: content.image,
        inView: content.inView,
        width: content.mediaDimension.width,
        height: content.mediaDimension.height,
        variant: variant,
        image_size: content.image_size,
        sixteenByNine: content.sixteenByNine,
        square: content.square
    };
    var useTypo = content.description_typography || 'body1';
    var typographyClassName = content.descriptionClassName;
    // without media / text only
    if (!content.image) {
        return (<CardWrap {...cardwrapProps}>
        <CardPrimaryAction>
          <div className="lm-card__content lm-card__content-padding">
            {CardListActionTitles(content)}
            {content.description &&
            <Typography tag="p" use={useTypo} className={typographyClassName}>{content.description}</Typography>}
          </div>
        </CardPrimaryAction>
      </CardWrap>);
    }
    // header on top
    if (variant.includes('header_top')) {
        return (<CardWrap {...cardwrapProps}>
        <div className="lm-card__content-padding">
          {CardListActionTitles(content)}
        </div>
        <CardPrimaryAction>
          <CardMediaElement {...cardMediaProps}/>
          {!descriptionIsEmpty && (<div className="lm-card__content lm-card__content-padding">
              {content.description &&
            <Typography tag="p" use={useTypo} className={typographyClassName}>{content.description}</Typography>}
            </div>)}
        </CardPrimaryAction>
      </CardWrap>);
    }
    // header over media or title bottom
    return (<CardWrap {...cardwrapProps}>
      <CardPrimaryAction>
        <CardMediaElement {...cardMediaProps}>
          {isOverMedia && (<CardMediaContent className="lm-card__content">{CardListActionTitles(content)}</CardMediaContent>)}
        </CardMediaElement>
        {!descriptionIsEmpty && (<div className="lm-card__content lm-card__content-padding">
            {!isOverMedia && CardListActionTitles(content)}
            {content.description &&
        <Typography tag="div" use={useTypo} className={typographyClassName}>{content.description}</Typography>}
          </div>)}
      </CardPrimaryAction>
    </CardWrap>);
};
export default CardListItem;
