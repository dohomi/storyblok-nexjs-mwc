var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import marked from 'marked';
var Markdown = function (props) {
    var componentProps = __assign({}, props);
    var rawMarkupFunc = function () {
        var renderer = new marked.Renderer();
        //
        renderer.link = function (href, title, text) {
            if (href.includes('@')) {
                href = "mailto:" + href;
            }
            else if (href.includes('+')) {
                href = "tel:" + href.replace('+', '');
            }
            else if (href.startsWith('http')) {
                return "<a href=\"" + href + "\" title=\"" + title + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + text + "</a>";
            }
            return "<a href=\"" + href + "\" title=\"" + title + "\">" + text + "</a>";
            // const l = parser.link(href,title,text)
            // console.log(href, title, text)
            // console.log(l)
            // return l
            // const CurrentLink = (
            //   <Link to={href}><a>{text}</a></Link>
            // )
            // // return render('<a></a>',)
            // // return {CurrentLink}
            // return render(<Link route={`${href}`}>{text}</Link>,'a')
        };
        var rawMarkup = marked(props.content, {
            //sanitize: true,
            renderer: renderer
        });
        return { __html: rawMarkup };
    };
    return <div {...componentProps} dangerouslySetInnerHTML={rawMarkupFunc()}></div>;
};
export default Markdown;
