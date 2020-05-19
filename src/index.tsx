import React from 'react'

import { LmAccordion } from './components/accordion/Accordion'
import { LmPage } from './components/page/Page'
import { LmTable } from './components/table/Table'
import { LmStaticSection } from './components/static-section/StaticSection'
import { LmStaticContainer } from './components/static-section/StaticContainer'
import { LmDivider } from './components/divider/Divider'
import { LmHubspotMeeting } from './components/hubspot-meeting/HubspotMeeting'
import { LmButtonList } from './components/button-list/ButtonList'
import { LmHeadline } from './components/headline/Headline'
import { LmParagraph } from './components/paragraph/Paragraph'
import { LmGridRow } from './components/section/GridRow'
import { LmGridColumn } from './components/section/GridColumn'
import { LmImage } from './components/image/ImageElement'
import { LmHtml } from './components/html/Html'
import { LmImageList } from './components/image-list/ImageList'
import { LmButton } from './components/button/Button'
import { LmNavList } from './components/nav-list/NavList'
import { LmMenu } from './components/menu/NavMenu'
import { LmIframe } from './components/iframe/Iframe'
import { LmSlider } from './components/slider/Slider'
import { LmSectionVideo } from './components/section/SectionVideoBg'
import { LmIcon } from './components/icon/Icon'
import { LmCardList } from './components/card/CardList'
import { LmSectionParallax } from './components/section/SectionParallax'
import { LmTabs } from './components/tabs/Tabs'
import { LmListWidget } from './components/list-widget/ListWidget'
import { LmFlexRow } from './components/flex-row/FlexRow'
import { LmIframeAdvanced } from './components/iframe/IframeAdvanced'
import { LmCategoryBox } from './components/list-widget/CategoryBox'
import { LmListSearchField } from './components/list-widget/ListSearchField'
import { LmLink } from './components/link/Link'
import { LmListSearchAutocomplete } from './components/list-widget/ListSearchAutocomplete'
import { LmRichTextParagraph } from './components/paragraph/RichTextParagraph'
import { LmTimeline } from './components/timeline/Timeline'
import { LmAvatar } from './components/avatar/LmAvatar'
import { LmDateHeadline } from './components/headline/DateHeadline'
import { LmMotion } from './components/motion/Motion'
import { LmSection } from './components/section/Section'
import { LmAccordionItem } from './components/accordion/AccordionItem'

// export type { LmAccordionProps } from './components/accordion/Accordion'
// export { LmAvatar } from './components/avatar/LmAvatar'
// export type { LmAvatarProps } from './components/avatar/LmAvatar'
// export { LmButton } from './components/button/Button'
// export type { LmButtonProps } from './components/button/Button'
// export { LmButtonList } from './components/button-list/ButtonList'
// export type { LmButtonListProps } from './components/button-list/ButtonList'
// export { LmCardList } from './components/card/CardList'
// export type { LmCardListProps } from './components/card/CardList'
// export { LmDivider } from './components/divider/Divider'
// export type { LmDividerProps } from './components/divider/Divider'
// export { LmFlexRow } from './components/flex-row/FlexRow'
// export type { LmFlexRowProps } from './components/flex-row/FlexRow'
// export { LmHeadline } from './components/headline/Headline'
// export type { LmHeadlineProps } from './components/headline/Headline'
// export { LmDateHeadline } from './components/headline/DateHeadline'
// export type { LmDateHeadlineProps } from './components/headline/DateHeadline'
// export { LmHtml } from './components/html/Html'
// export type { LmHtmlProps } from './components/html/Html'
// export { LmHubspotMeeting } from './components/hubspot-meeting/HubspotMeeting'
// export type { LmHubspotMeetingProps } from './components/hubspot-meeting/HubspotMeeting'
// export { LmIcon } from './components/icon/Icon'
// export type { LmIconProps } from './components/icon/Icon'
// export { LmIframe } from './components/iframe/Iframe'
// export type { LmIframeProps } from './components/iframe/Iframe'
// export { LmIframeAdvanced } from './components/iframe/IframeAdvanced'
// export type { LmIframeAdvancedProps } from './components/iframe/IframeAdvanced'
// export { LmImage } from './components/image/ImageElement'
// export type { LmImageProps } from './components/image/ImageElement'
// export { LmImageList } from './components/image-list/ImageList'
// export type { LmImageListProps } from './components/image-list/ImageList'
// export { LmListWidget } from './components/list-widget/ListWidget'
// export type { LmListWidgetProps } from './components/list-widget/ListWidget'
// export { LmListSearchAutocomplete } from './components/list-widget/ListSearchAutocomplete'
// export type { LmListSearchAutocompleteProps } from './components/list-widget/ListSearchAutocomplete'
// export { LmLink } from './components/link/Link'
// export type { LmLinkProps } from './components/link/Link'
// export { LmMenu } from './components/menu/NavMenu'
// export type { LmMenuProps } from './components/menu/NavMenu'
// export { LmMotion } from './components/motion/Motion'
// export type { LmMotionProps } from './components/motion/Motion'
// export { LmNavList } from './components/nav-list/NavList'
// export type { LmNavListProps } from './components/nav-list/NavList'
// export { LmPage } from './components/page/Page'
// export type { LmPageProps } from './components/page/Page'
// export { default as LmPagesIndex } from './components/pages/Index'
// export type { LmPagesIndexProps } from './components/pages/Index'
// export { LmParagraph } from './components/paragraph/Paragraph'
// export type { LmParagraphProps } from './components/paragraph/Paragraph'


// export { LmRichTextParagraph } from './components/paragraph/RichTextParagraph'
// export type { LmRichTextParagraphProps } from './components/paragraph/RichTextParagraph'
// export { LmSection } from './components/section/Section'
// export type { LmSectionProps } from './components/section/Section'
// export { LmSectionParallax } from './components/section/SectionParallax'
// export type { LmSectionParallaxProps } from './components/section/SectionParallax'
// export { LmSectionVideo } from './components/section/SectionVideoBg'
// export type { LmSectionVideoProps } from './components/section/SectionVideoBg'
// export { LmSlider } from './components/slider/Slider'
// export type { LmSliderProps } from './components/slider/Slider'
// export { LmTable } from './components/table/Table'
// export type { LmTableProps } from './components/table/Table'
// export { LmTabs } from './components/tabs/Tabs'
// export type { LmTabsProps } from './components/tabs/Tabs'
// export { LmTimeline } from './components/timeline/Timeline'
// export type { LmTimelineProps } from './components/timeline/Timeline'
// export { LmCategoryBox } from './components/list-widget/CategoryBox'
// export type { LmCategoryBoxProps } from './components/list-widget/CategoryBox'
// export { LmListSearchField } from './components/list-widget/ListSearchField'
// export type { LmListSearchFieldProps } from './components/list-widget/ListSearchField'
// export { LmGridRow } from './components/section/GridRow'
// export type { LmGridRowProps } from './components/section/GridRow'
// export { LmGridColumn } from './components/section/GridColumn'
// export type { LmGridColumnProps } from './components/section/GridColumn'
// export { LmStaticSection } from './components/static-section/StaticSection'
// export type { LmStaticSectionProps } from './components/static-section/StaticSection'
// export { LmStaticContainer } from './components/static-section/StaticContainer'
// export type { LmStaticContainerProps } from './components/static-section/StaticContainer'
// export { default as LmComponentRender } from './components/ComponentRender'
//
//
// export { default as pagesGetStaticPaths } from './utils/initial-props/pagesGetStaticPaths'
// export { default as pagesGetStaticProps } from './utils/initial-props/pagesGetStaticProps'
// export { default as pagesGetServerSideProps } from './utils/initial-props/pagesGetServerSideProps'
// // export { default as LmPagesDocument } from './pages/_document'
// // export { default as apiSitemap } from './pages/api/sitemap'
// // export { default as apiPreview } from './pages/api/preview'
// // export { default as apiClearCache } from './pages/api/clear-cache'
// // export { default as apiSharedData } from './pages/api/shared-data'

const CoreComponentsNamed = {
  'page': LmPage,
  'table': LmTable,
  'accordion': LmAccordion,
  'accordion_item': LmAccordionItem,
  // 'promotion': Promotion,
  'static_section': LmStaticSection,
  'static_container': LmStaticContainer,
  'divider': LmDivider,
  'html': LmHtml,
  // 'pricing': Pricing,
  // 'hubspot_form': HubspotForm,
  'hubspot_meeting': LmHubspotMeeting,
  'button_list': LmButtonList,
  'section': LmSection,
  'headline': LmHeadline,
  'paragraph': LmParagraph,
  'row': LmGridRow,
  'column': LmGridColumn,
  'image': LmImage,
  'image_list': LmImageList,
  'button': LmButton,
  'nav_list': LmNavList,
  'nav_menu': LmMenu,
  'icon': LmIcon,
  'iframe': LmIframe,
  'slider': LmSlider,
  'section_video_bg': LmSectionVideo,
  'card_list': LmCardList,
  'section_parallax': LmSectionParallax,
  // 'form': Form,
  'tabs': LmTabs,
  'list_widget': LmListWidget,
  'flex_row': LmFlexRow,
  'iframe_advanced': LmIframeAdvanced,
  'category_box': LmCategoryBox,
  'list_search_field': LmListSearchField,
  'link': LmLink,
  'list_search_autocomplete': LmListSearchAutocomplete,
  'rich_text_editor': LmRichTextParagraph,
  'timeline': LmTimeline,
  'avatar': LmAvatar,
  'date_headline': LmDateHeadline,
  'motion': LmMotion
}

export default function LmComponentRender(blok: any): JSX.Element {
  const { content, _uid, ...rest } = blok
  console.log('hier', blok, content)

  if (typeof CoreComponentsNamed[content.component] !== 'undefined') {
    return React.createElement(CoreComponentsNamed[content.component], {
      key: _uid,
      content: content,
      ComponentRender: LmComponentRender,
      ...rest
    })
  }
  return React.createElement(() => (
    <div style={{ color: 'red' }}>The component {content.component} has not been created yet.</div>
  ), { key: blok._uid })
}
