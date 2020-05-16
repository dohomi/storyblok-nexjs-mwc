import Page from './page/Page'
import Section from './section/Section'
import { LmHeadline } from './headline/Headline'
import { LmImage } from './image/ImageElement'
import { LmImageList } from './image-list/ImageList'
import NavList from './nav-list/NavList'
import Menu from './menu/NavMenu'
import { LmIcon } from './icon/Icon'
import SectionVideoBg from './section/SectionVideoBg'
import Slider from './slider/Slider'
import { LmIframe } from './iframe/Iframe'
import { LmCardList } from './card/CardList'
import SectionParallax from './section/SectionParallax'
import { LmButtonList } from './button-list/ButtonList'
import { LmHtml } from './html/Html'
import { LmHubspotMeeting } from './hubspot-meeting/HubspotMeeting'
import { LmDivider } from './divider/Divider'
import { LmAccordion } from './accordion/Accordion'
import Table from './table/Table'
import Tabs from './tabs/Tabs'
import { LmListWidget } from './list-widget/ListWidget'
import { LmFlexRow } from './flex-row/FlexRow'
import { LmIframeAdvanced } from './iframe/IframeAdvanced'
import CategoryBox from './list-widget/CategoryBox'
import ListSearchField from './list-widget/ListSearchField'
import LinkWwrap from './link/Link'
import {LmListSearchAutocomplete} from './list-widget/ListSearchAutocomplete'
import RichTextParagraph from './paragraph/RichTextParagraph'
import { LmButton } from './button/Button'
import GridRow from './section/GridRow'
import GridColumn from './section/GridColumn'
import StaticSection from './static-section/StaticSection'
import StaticContainer from './static-section/StaticContainer'
import Timeline from './timeline/Timeline'
import { LmAvatar } from './avatar/LmAvatar'

import dynamic from 'next/dynamic'
import { LmDateHeadline } from './headline/DateHeadline'
import Motion from './motion/Motion'

// import HubspotForm from './hubspot/HubspotForm'
// import Form from './form/Form'
// import Pricing from './pricing/Pricing'
// import Promotion from './promotion/Promotion'

const Components = {
  'page': Page,
  'table': Table,
  'accordion': LmAccordion,
  // 'promotion': Promotion,
  'static_section': StaticSection,
  'static_container': StaticContainer,
  'divider': LmDivider,
  'html': LmHtml,
  // 'pricing': Pricing,
  // 'hubspot_form': HubspotForm,
  'hubspot_meeting': LmHubspotMeeting,
  'button_list': LmButtonList,
  'section': Section,
  'headline': LmHeadline,
  'paragraph': dynamic(() => import('./paragraph/Paragraph')),
  'row': GridRow, // MatRow, GridRow
  'column': GridColumn, // Column, GridColumn
  'image': LmImage,
  'image_list': LmImageList,
  'button': LmButton,
  'nav_list': NavList,
  'nav_menu': Menu,
  'icon': LmIcon,
  'iframe': LmIframe,
  'slider': Slider,
  'section_video_bg': SectionVideoBg,
  'card_list': LmCardList,
  'section_parallax': SectionParallax,
  // 'form': Form,
  'tabs': Tabs,
  'list_widget': LmListWidget,
  'flex_row': LmFlexRow,
  'iframe_advanced': LmIframeAdvanced,
  'category_box': CategoryBox,
  'list_search_field': ListSearchField,
  'link': LinkWwrap,
  'list_search_autocomplete': LmListSearchAutocomplete,
  'rich_text_editor': RichTextParagraph,
  'timeline': Timeline,
  'avatar': LmAvatar,
  'date_headline': LmDateHeadline,
  'motion': Motion
}

export default Components
