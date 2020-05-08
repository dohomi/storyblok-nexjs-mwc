export default function parseFont(string) {
    if (!string)
        return null;
    var name = string.split(':')[0];
    return name.replace(/\+/g, ' ');
}
export var getFontBasedOnSetting = function (settings) {
    var settingsFonts = ['theme_font_default', 'theme_font_alt1', 'theme_font_alt2', 'theme_font_alt3', 'theme_font_alt4'];
    var loadFonts = [];
    Object.keys(settings).forEach(function (key) {
        if (settingsFonts.includes(key) && settings[key]) {
            loadFonts.push(settings[key]);
        }
    });
    return loadFonts;
};
