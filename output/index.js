function initXMLhttp() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}
class AjaxConfig {
}
function minAjax(config) {
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
    }
    else {
        config.async = false;
    }
    if (!config.debugLog) {
        config.debugLog = false;
    }
    var xmlhttp = initXMLhttp();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (config.success) {
                config.success(xmlhttp.responseText, xmlhttp.readyState);
            }
            if (config.debugLog == true)
                console.log("SuccessResponse");
            if (config.debugLog == true)
                console.log("Response Data:" + xmlhttp.responseText);
        }
        else {
            if (config.debugLog == true)
                console.log("FailureResponse --> State:" + xmlhttp.readyState + "Status:" + xmlhttp.status);
            if (config.errorCallback) {
                console.log("Calling Error Callback");
                config.errorCallback();
            }
        }
    };
    var sendString = [], sendData = config.data;
    if (typeof sendData === "string") {
        var tmpArr = String.prototype.split.call(sendData, '&');
        for (var i = 0, j = tmpArr.length; i < j; i++) {
            var datum = tmpArr[i].split('=');
            sendString.push(encodeURIComponent(datum[0]) + "=" + encodeURIComponent(datum[1]));
        }
    }
    else if (typeof sendData === 'object' && !(sendData instanceof String || (FormData && sendData instanceof FormData))) {
        for (var k in sendData) {
            var datum = sendData[k];
            if (Object.prototype.toString.call(datum) == "[object Array]") {
                for (var i = 0, j = datum.length; i < j; i++) {
                    sendString.push(encodeURIComponent(k) + "[]=" + encodeURIComponent(datum[i]));
                }
            }
            else {
                sendString.push(encodeURIComponent(k) + "=" + encodeURIComponent(datum));
            }
        }
    }
    var sendStr = sendString.join('&');
    if (config.method == "GET") {
        xmlhttp.open("GET", config.url + "?" + sendStr, config.async);
        xmlhttp.send();
        if (config.debugLog == true) {
            console.log("GET fired at:" + config.url + "?" + sendStr);
        }
    }
    else {
        xmlhttp.open(config.method, config.url, config.async);
        xmlhttp.setRequestHeader("Content-type", config.contentType !== null ? config.contentType : "application/x-www-form-urlencoded");
        xmlhttp.send(sendStr);
        if (config.debugLog == true) {
            console.log(`${config.method} fired at: ${config.url} || Data: ${sendStr}`);
        }
    }
}
//# sourceMappingURL=index.js.map