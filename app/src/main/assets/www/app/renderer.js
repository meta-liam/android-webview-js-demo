console.log("---------11111-----------5");

function callBackToClient(v){
    console.log("---------setLinkCallBack-----------");
    showLog(v);
}

window.setLinkCallBack(callBackToClient) ;

function linkCallMobileNative2(parameters){
    window.linkCallMobileNative(parameters);
}

// test:
function linkTestCall(){
    linkCallMobileNative2('{"jsonrpc":"2.0","method":"say","params":"liam","id":1,"service":"hello-world"}');
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
    linkCallMobileNative2('{"jsonrpc":"2.0","method":"say","params":"liam","id":1,"service":"hello-world"}');
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
    linkCallMobileNative2(v);
});
