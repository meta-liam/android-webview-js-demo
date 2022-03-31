console.log("---------11111-----------");
//本方法兼容安卓与iOS
function linkCallMobile(handlerInterface,handlerMethod,parameters){
    //handlerInterface由iOS addScriptMessageHandler与andorid addJavascriptInterface 代码注入而来。
    var dic = {'handlerInterface':handlerInterface,'function':handlerMethod,'parameters': parameters};
    
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
        window.webkit.messageHandlers[handlerInterface].postMessage(dic);
    }else{
        //安卓传输不了js json对象
        window[handlerInterface][handlerMethod](JSON.stringify(parameters));
    }
}
function linkCallMobileNative(parameters){
    linkCallMobile("LinkNative","jsonrpc",parameters);
    //showLog(parameters);//mock
}
function linkNativeCallBack(v){
    //alert("linkNativeCallBack:"+v);
    showLog(v);
}
// test:
function linkTestCall(){
    linkCallMobileNative('{"jsonrpc":"2.0","method":"say","params":"liam","id":1,"service":"hello-world"}');
}
console.log("---------0000-----------");
var ws ;
var inputMsg = document.getElementById("msgInput");
var outMsg = document.getElementById("msgOutput");

function showLog(v){
    let date = new Date();
    let pre = "["+date.getHours() +":"+ date.getMinutes() +":"+date.getSeconds()+"] ";
    v= pre+ v;
    console.log("log:",v);
    outMsg.innerHTML =v+ "<br>"+ outMsg.innerHTML ;
}

function sayHello(){
    linkCallMobileNative('{"jsonrpc":"2.0","method":"say","params":"liam","id":1,"service":"hello-world"}');
}

document.getElementById("ts01").addEventListener('click',function ()
{
    showLog("hello!16");
}); 

document.getElementById("tsSayHello").addEventListener('click',function ()
{
    sayHello();
});

function clearString(v){
    let st = v.replace('\n', "");
    return st;
}

document.getElementById("tsSend").addEventListener('click',function ()
{
    var v = clearString(""+ inputMsg.value);
    linkCallMobileNative(v);
});
