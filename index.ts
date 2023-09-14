/*|--minAjax.js--|
  |--(A Minimalistic Pure JavaScript Header for Ajax POST/GET Request )--|
  |--Author : flouthoc (gunnerar7@gmail.com)(http://github.com/flouthoc)--|
  |--Contributers : Add Your Name Below--|
  */

var XMLHTTPtypes = [
    function() { return new XMLHttpRequest(); },
    function() { return new ActiveXObject("Msxml3.XMLHTTP"); },
    function() { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); },
    function() { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); },
    function() { return new ActiveXObject("Msxml2.XMLHTTP"); },
    function() { return new ActiveXObject("Microsoft.XMLHTTP"); }
];
function initXMLhttp() {

    var xmlhttp: XMLHttpRequest;
    if (window.XMLHttpRequest) {
        //code for IE7,firefox chrome and above
        xmlhttp = new XMLHttpRequest();
    } else {
        //code for Internet Explorer
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xmlhttp;
}

class AjaxConfig {
    url: string;
    debugLog: boolean;
    method: string;
    async: boolean;
    success: Function;
    errorCallback: Function;
    data: any;
}

function minAjax(config: AjaxConfig) {

    /*Config Structure
            url:"reqesting URL"
            type:"GET or POST"
            async: "(OPTIONAL) True for async and False for Non-async | By default its Async"
            debugLog: "(OPTIONAL)To display Debug Logs | By default it is false"
            data: "(OPTIONAL) another Nested Object which should contains reqested Properties in form of Object Properties"
            success: "(OPTIONAL) Callback function to process after response | function(data,status)"
            errorCallback: "(OPTIONAL) Callback function to process after error | function()"
    */

    if (!config.url) {
        if (config.debugLog == true)
            console.log("No Url!");
        return;
    }

    if (!config.method) {
        if (config.debugLog == true)
            console.log("No Default method (GET/POST) given!");
        return;
    }

    if (config.async === undefined || config.async === true) {
        config.async = true;
    } else {
        config.async = false;
    }

    if (!config.debugLog) {
        config.debugLog = false;
    }

    var xmlhttp = initXMLhttp();

    xmlhttp.onreadystatechange = function() {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            if (config.success) {
                config.success(xmlhttp.responseText, xmlhttp.readyState);
            }

            if (config.debugLog == true)
                console.log("SuccessResponse");
            if (config.debugLog == true)
                console.log("Response Data:" + xmlhttp.responseText);

        } else {

            if (config.debugLog == true)
                console.log("FailureResponse --> State:" + xmlhttp.readyState + "Status:" + xmlhttp.status);
          
            if(config.errorCallback){
                console.log("Calling Error Callback");
                config.errorCallback();
            }
        }
    }

    var sendString: string[] = [],
        sendData = config.data;
    if( typeof sendData === "string" ){
        var tmpArr = String.prototype.split.call(sendData,'&');
        for(var i = 0, j = tmpArr.length; i < j; i++){
            var datum = tmpArr[i].split('=');
            sendString.push(encodeURIComponent(datum[0]) + "=" + encodeURIComponent(datum[1]));
        }
    }else if( typeof sendData === 'object' && !( sendData instanceof String || (FormData && sendData instanceof FormData) ) ){
        for (var k in sendData) {
            var datum = sendData[k];
            if( Object.prototype.toString.call(datum) == "[object Array]" ){
                for(var i = 0, j = datum.length; i < j; i++) {
                        sendString.push(encodeURIComponent(k) + "[]=" + encodeURIComponent(datum[i]));
                }
            }else{
                sendString.push(encodeURIComponent(k) + "=" + encodeURIComponent(datum));
            }
        }
    }
    var sendStr = sendString.join('&');

    if (config.method == "GET") {
        xmlhttp.open("GET", config.url + "?" + sendStr, config.async);
        xmlhttp.send();

        if (config.debugLog == true)
            console.log("GET fired at:" + config.url + "?" + sendStr);
    }
    if (config.method == "POST") {
        xmlhttp.open("POST", config.url, config.async);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(sendStr);

        if (config.debugLog == true)
            console.log("POST fired at:" + config.url + " || Data:" + sendStr);
    }
}