import { isMobile } from 'is-mobile';
const deviceDetect = (req) => {
    let userAgent = req && req.headers['user-agent'];
    const mobileDevice = isMobile({ ua: userAgent });
    const tabletDevice = isMobile({ ua: userAgent, tablet: true });
    const obj = {
        width: 1080,
        isTablet: false,
        isMobile: false,
        isDesktop: true
    };
    if (mobileDevice) {
        obj.device = 'mobile';
        obj.width = 599;
        obj.isMobile = true;
        obj.isDesktop = false;
    }
    else if (tabletDevice) {
        obj.width = 959;
        obj.device = 'tablet';
        obj.isTablet = true;
        obj.isDesktop = false;
    }
    return obj;
};
export default deviceDetect;
