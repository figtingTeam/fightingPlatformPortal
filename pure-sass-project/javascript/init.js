/**
 * [以iPhone6的设计稿为例js动态设置文档 rem 值]
 * @param  {[type]} doc [文档元素]
 * @param  {[type]} win [window]
 * @return {[type]}     [description]
 */
(function(doc, win) {
    var docEl = doc.documentElement;
    var resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var remcalc = function() {
        var currClientWidth = docEl.clientWidth;
        var fontValue;
        if (!currClientWidth) return;
        fontValue = ((20 * currClientWidth) / 375).toFixed(2);
        fontValue = fontValue > 106.67 ? 106.67 : fontValue;
        window.baseFontSize = fontValue;
        docEl.style.fontSize = baseFontSize + 'px';
    };
    if (!docEl.addEventListener) return;
    win.addEventListener(resizeEvent, remcalc, false);
    doc.addEventListener('DOMContentLoaded', remcalc, false);
})(document, window);