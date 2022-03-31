package com.example.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends Activity {

    private WebView mWebView;

    @Override
    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mWebView = findViewById(R.id.activity_main_webview);
        WebSettings webSettings = mWebView.getSettings();
        // 设置与Js交互的权限
        webSettings.setJavaScriptEnabled(true);
        // 设置允许JS弹窗
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        mWebView.setWebViewClient(new MyWebViewClient());
        mWebView.addJavascriptInterface(this,"LinkNative");  //注入Native对象到webview window中

        // REMOTE RESOURCE
        // mWebView.loadUrl("https://example.com");
        // LOCAL RESOURCE
        mWebView.loadUrl("file:///android_asset/www/site/index.html");
    }

    @JavascriptInterface
    public void jsonrpc(String param){
        Log.i("[INFO]jsonrpc:",param.toString());
        nativeCallJs(param);
    }

    @Override
    public void onBackPressed() {
        if(mWebView.canGoBack()) {
            mWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    public void nativeCallJs(String parameters){
        String jsStr = "javascript:linkNativeCallBack("+parameters+")" ;
        Log.i("[INFO]nativeCallJs:",jsStr.toString());
        //js
        mWebView.post(new Runnable() {
            @Override
            public void run() {
                mWebView.evaluateJavascript(jsStr, new ValueCallback<String>() {
                    @Override
                    public void onReceiveValue(String value) {
                        //此处为 js 返回的结果
                        Log.i("[INFO]onReceiveValue:",value.toString());
                    }
                });
            }
        });
    }
}
