import FontFaceObserver from 'fontfaceobserver';
var fontHandler = function (settings) {
    var settingsFonts = ['theme_font_default', 'theme_font_alt1', 'theme_font_alt2', 'theme_font_alt3', 'theme_font_alt4'];
    var loadFonts = ['Material+Icons'];
    Object.keys(settings).forEach(function (key) {
        if (settingsFonts.includes(key) && settings[key]) {
            loadFonts.push(settings[key]);
        }
    });
    if (!settings.theme_font_default) {
        loadFonts.push('Nunito:300,400,700');
    }
    var link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css?family=" + loadFonts.join('|');
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    //https://fonts.googleapis.com/css?family=Nunito:300,400,700|Material+Icons
    var fonts = {
        material: new FontFaceObserver('Material Icons', {
            weight: 400
        })
        // nunito: new FontFaceObserver('Nunito', {
        //   weight: 400
        // })
    };
    // currently only watch on icons
    Promise.all([
        fonts.material.load()
        // fonts.nunito.load()
    ]).then(function () {
        document.documentElement.classList.add('fonts-loaded');
    }).catch(function (e) {
        console.error(e);
        document.documentElement.classList.add('fonts-failed');
    });
};
export default fontHandler;
