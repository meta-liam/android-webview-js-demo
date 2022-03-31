const _global = (window || global);
let _linkCallBackToClient = null;
function linkCallMobile(handlerInterface = "", handlerMethod = "", parameters = "", dev = "auto") {
    var dic = { 'handlerInterface': handlerInterface, 'function': handlerMethod, 'parameters': parameters };
    let isIos = (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent));
    if ((dev === "auto" && isIos) || dev === "ios") {
        isIos = true;
    }
    if (isIos) {
        window.webkit.messageHandlers[handlerInterface].postMessage(dic);
    }
    else {
        window[handlerInterface][handlerMethod](JSON.stringify(parameters));
    }
}
function linkCallMobileNative(parameters, dev = "auto") {
    if (!(typeof (parameters) === 'string')) {
        parameters = parameters + '';
    }
    console.log("linkCallMobileNative::", parameters, dev);
    linkCallMobile("LinkNative", "jsonrpc", parameters, dev);
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