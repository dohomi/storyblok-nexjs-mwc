import dynamic from 'next/dynamic'
import { LmPage } from './page/Page'
import { LmSection } from './section/Section'
import { LmHeadline } from './headline/Headline'
import { LmImage } from './image/ImageElement'
import { LmImageList } from './image-list/ImageList'
import { LmNavList } from './nav-list/NavList'
import { LmMenu } from './menu/NavMenu'
import { LmIcon } from './icon/Icon'
import { LmSectionVideo } from './section/SectionVideoBg'
import { LmSlider } from './slider/Slider'
import { LmIframe } from './iframe/Iframe'
import { LmCardList } from './card/CardList'
import { LmSectionParallax } from './section/SectionParallax'
import { LmButtonList } from './button-list/ButtonList'
import { LmHtml } from './html/Html'
import { LmHubspotMeeting } from './hubspot-meeting/HubspotMeeting'
import { LmDivider } from './divider/Divider'
import { LmAccordion } from './accordion/Accordion'
import { LmTable } from './table/Table'
import { LmTabs } from './tabs/Tabs'
import { LmListWidget } from './list-widget/ListWidget'
import { LmFlexRow } from './flex-row/FlexRow'
import { LmIframeAdvanced } from './iframe/IframeAdvanced'
import { LmCategoryBox } from './list-widget/CategoryBox'
import { LmListSearchField } from './list-widget/ListSearchField'
import { LmLink } from './link/Link'
import { LmListSearchAutocomplete } from './list-widget/ListSearchAutocomplete'
import { LmRichTextParagraph } from './paragraph/RichTextParagraph'
import { LmButton } from './button/Button'
import { LmGridRow } from './section/GridRow'
import { LmGridColumn } from './section/GridColumn'
import { LmStaticSection } from './static-section/StaticSection'
import { LmStaticContainer } from './static-section/StaticContainer'
import { LmTimeline } from './timeline/Timeline'
import { LmAvatar } from './avatar/LmAvatar'

import { LmDateHeadline } from './headline/DateHeadline'
import { LmMotion } from './motion/Motion'

// import HubspotForm from './hubspot/HubspotForm'
// import Form from './form/Form'
// import Pricing from './pricing/Pricing'
// import Promotion from './promotion/Promotion'

const Components = {
  'page': LmPage,
  'table': LmTable,
  'accordion': LmAccordion,
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
  'paragraph': dynamic(() => import('./paragraph/Paragraph')),
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

export default Components
