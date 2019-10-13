import clsx from 'clsx';
import { toolbar } from '../../../utils/themeContentSection';
import SbEditable from 'storyblok-react';
import { ThemeProvider } from '@rmwc/theme';
import TopAppBarWrap from './TopAppBar';
import { TopAppBarFixedAdjust, TopAppBarNavigationIcon, TopAppBarRow, TopAppBarSection } from '@rmwc/top-app-bar';
import { toggleLeftNavigation } from '../../../utils/state/actions';
import ToolbarLogo from './ToolbarLogo';
import Components from 'components';
var HeaderSimple = function (props) {
    var _a;
    var content = props.settings || {};
    var toolbarConfig = content.toolbar_config || [];
    var transparentToolbar = props.hasFeature;
    var mobileNavBreakpoint = content.mobile_nav_breakpoint || 'sm';
    var navRight = content.toolbar || [];
    var color = content.toolbar_variant;
    var rowClassName = clsx('lm-toolbar-row d-flex justify-content-center', (_a = {},
        _a['mdc-layout-grid--fixed-column-width'] = toolbarConfig.includes('fixed_width'),
        _a['w-100'] = !toolbarConfig.includes('fixed_width'),
        _a));
    var theme = toolbar.primary;
    if (color) {
        theme = toolbar[color];
    }
    return (<SbEditable content={content}>
      <ThemeProvider options={theme}>
        <TopAppBarWrap transparentToolbar={transparentToolbar} toolbarConfig={toolbarConfig} fixed={toolbarConfig.includes('fixed')}>
          <TopAppBarRow>
            <div className={rowClassName}>
              <TopAppBarSection>
                <TopAppBarNavigationIcon icon="menu" className={"d-" + mobileNavBreakpoint + "-none"} onClick={toggleLeftNavigation}/>
                <ToolbarLogo settings={content}/>
              </TopAppBarSection>
              {!!navRight.length && (<TopAppBarSection alignEnd className={"d-none d-" + mobileNavBreakpoint + "-inline-flex"}>
                  {navRight.map(function (blok) { return Components(blok); })}
                </TopAppBarSection>)}
            </div>
          </TopAppBarRow>
        </TopAppBarWrap>
      </ThemeProvider>
      {!props.hasFeature && <TopAppBarFixedAdjust />}
    </SbEditable>);
};
export default HeaderSimple;
