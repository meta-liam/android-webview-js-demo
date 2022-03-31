const _global = (window || global);
let _linkCallBackToClient = null;
function linkCallMobile(handlerInterface = "", handlerMethod = "", parameters = "") {
    var dic = { 'handlerInterface': handlerInterface, 'function': handlerMethod, 'parameters': parameters };
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers[handlerInterface].postMessage(dic);
    }
    else {
        window[handlerInterface][handlerMethod](JSON.stringify(parameters));
    }
}
function linkCallMobileNative(parameters) {
    if (!(typeof (parameters) === 'string')) {
        parameters = parameters + '';
    }
    console.log("linkCallMobileNative::", parameters);
    linkCallMobile("LinkNative", "jsonrpc", parameters);
}
function linkNativeCallBack(v) {
    console.log("linkNativeCallBack:", v);
    if (_linkCallBackToClient) {
        _linkCallBackToClient(v);
    }
}
function setLinkCallBack(callBack) {
    _linkCallBackToClient = callBack;
}
_global.setLinkCallBack = setLinkCallBack;
_global.linkCallMobileNative = linkCallMobileNative;
_global.linkNativeCallBack = linkNativeCallBack;
//# sourceMappingURL=global.js.map