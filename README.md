# minAjax.js

A minimalist Javascript library to perform AJAX POST and GET Request.

## Check Pretty Documentation

[http://flouthoc.github.io/minAjax.js/]

## Usage

Getting Started

```bash
npm i minajax.js
```

```html
<script type="text/javascript" src="https://cdn.rawgit.com/flouthoc/minAjax.js/master/minify/index.min.js"></script>
```

### Regular

```js
  minAjax({
    url:"test.php",//request URL
    type:"GET",//Request type GET/POST
    //Send Data in form of GET/POST
    data:{
      name:"batman",
      profession:"detective",
      worth:"Rich",
      company:"Wayne Enterprises"
    },
    //CALLBACK FUNCTION with RESPONSE as argument
    success: function(data){
      alert(data);
    }

  });
```

This is example to use minAjax() , these are the frequent arguments which are usually passed for request to take place there are some optional arguments i'll explain them below.

## Required Arguments

### url

```js
  url:'Path or Link to Server Side.'
```

### type

```js
  method:'GET or POST'
```

## Optional Arguments

### data

```js
  data:{
          param1:value1,
          param2:value2,
          param3:value3,
          param4:value4,
          //also send Arrays
          foo2:["bar2","bar 3","bar+4"]
          //and blah blah as many param as things support.
          }
```

### success

```js
  success: function(data){
          alert(data);
          //function to be executed on true response with response TEXT as argument.
          }
```

Execution of Callback function on valid response is totally optional , function can take `ResponseText` and `ResponseStatus` as arguments to process on client side.

### method

```js
async:'True For Asyn and False for Non-Async | By default it is True'
```

By Default Method will be `True` i.e Async calls. **You Can Leave This**

### debugLog

```js
debugLog:'True to enable Debug Console Logs | By Default it is False'
```

By Default Method will be `False` | **You Can Leave This**

## Example with all arguments

```js
minAjax({
    url: "test.php",//request URL
    method: "GET",//Request type GET/POST
    //Send Data in form of GET/POST
    data:{
      name:"Superman",
      secretname:"Clark Kent",
      profession:"reporter",
      worth:"poor",
      company:"Daily Planet"
    },
    async: true,
    debugLog:"true",
    //CALLBACK FUNCTION with RESPONSE as argument
    success: function(data){
      alert(data);
    }

  });
  
```

## Fork it

Contributions welcome
