export const rem = () => {
    var documentEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = documentEl.clientWidth
            if (!clientWidth) return
            documentEl.style.fontSize = 37.5 * (clientWidth / 375) + 'px'
        }
    if (!document.addEventListener) return
    window.addEventListener(resizeEvt, recalc, false)
    document.addEventListener('DOMContentLoaded', recalc, false)
}
