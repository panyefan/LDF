
function hideAddressBar_ios() {
    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
        bodyTag = document.getElementsByTagName('body')[0];
        bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
    }
    setTimeout(function () {
        window.scrollTo(0, 1);
    }, 100);
}
function hideAddressBar_android() {
    var n = navigator.userAgent;
    if (n.match(/UCBrowser/i)) {
        //uc浏览器
        hideAddressBar_ios();
        return false;
    }
    var self = document.getElementsByTagName('body')[0];
    if (self.requestFullscreen) {
        self.requestFullscreen();
    } else if (self.mozRequestFullScreen) {
        self.mozRequestFullScreen();
    } else if (self.webkitRequestFullScreen) {
        self.webkitRequestFullScreen();
    }
}
window.addEventListener("load", function () {
    navigator.userAgent.match(/Android/i) ? hideAddressBar_android() : hideAddressBar_ios();
});