# CORS

Cross-origin resource sharing (CORS) is a mechanism that allows resources to be requested from another domain. Under the hood, Nest makes use of the Express [cors](https://github.com/expressjs/cors) package. This package provides various options that you can customize based on your requirements.The CORS mechanism supports secure cross-origin requests and data transfers between browsers and servers. 

## Installation
```
$ npm install cors
```

## Simple Usage (Enable *All* CORS Requests)
```
# bootstrap.ts
import * as cors from 'cors';
import { corsOptions } from './CORS/cors.config';

app.use(cors(corsOptions));
```

`corsOptions` is used to set the configuration options of cors middleware. Here we have set origin option to enable Access-Control-Allow-Origin CORS header.

```
# cors.config.ts
export const corsOptions = {
    origin: ['http://example1.com', 'http://example2.com','http://127.0.0.1:5500'],
  }
```
## Using fetch API to check CORS
We can make a fetch request(by writing a simple HTML file) to our server to check whether our CORS configuration are working properly

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checking CORS</title>
</head>
<body>
    <script>
        fetch('http://localhost:5000/',{method: 'get'})
        .then(res=> res.json())
        .then(data => console.log(data));
    </script>
</body>
</html>

```
The result that we got are shown below

> Here we can see the response in the console

![Console](https://github.com/ssingh3006/rest-node-nestjs/blob/newFeatures/wiki/images/CORS-console-result.PNG?raw=true)

> Here we can see that the responnse header `Access-Control-Allow-Origin` is set to the origin from where we are making fetch request

![Response Headers](https://github.com/ssingh3006/rest-node-nestjs/blob/newFeatures/wiki/images/CORS-response-headers.PNG?raw=true)


## Configuration Options

* `origin`: Configures the **Access-Control-Allow-Origin** CORS header. Possible values:
  - `Boolean` - set `origin` to `true` to reflect the [request origin](http://tools.ietf.org/html/draft-abarth-origin-09), as defined by `req.header('Origin')`, or set it to `false` to disable CORS.
  - `String` - set `origin` to a specific origin. For example if you set it to `"http://example.com"` only requests from "http://example.com" will be allowed.
  - `RegExp` - set `origin` to a regular expression pattern which will be used to test the request origin. If it's a match, the request origin will be reflected. For example the pattern `/example\.com$/` will reflect any request that is coming from an origin ending with "example.com".
  - `Array` - set `origin` to an array of valid origins. Each origin can be a `String` or a `RegExp`. For example `["http://example1.com", /\.example2\.com$/]` will accept any request from "http://example1.com" or from a subdomain of "example2.com".
  - `Function` - set `origin` to a function implementing some custom logic. The function takes the request origin as the first parameter and a callback (called as `callback(err, origin)`, where `origin` is a non-function value of the `origin` option) as the second.
* `methods`: Configures the **Access-Control-Allow-Methods** CORS header. Expects a comma-delimited string (ex: 'GET,PUT,POST') or an array (ex: `['GET', 'PUT', 'POST']`).
* `allowedHeaders`: Configures the **Access-Control-Allow-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Type,Authorization') or an array (ex: `['Content-Type', 'Authorization']`). If not specified, defaults to reflecting the headers specified in the request's **Access-Control-Request-Headers** header.
* `exposedHeaders`: Configures the **Access-Control-Expose-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Range,X-Content-Range') or an array (ex: `['Content-Range', 'X-Content-Range']`). If not specified, no custom headers are exposed.
* `credentials`: Configures the **Access-Control-Allow-Credentials** CORS header. Set to `true` to pass the header, otherwise it is omitted.
* `maxAge`: Configures the **Access-Control-Max-Age** CORS header. Set to an integer to pass the header, otherwise it is omitted.
* `preflightContinue`: Pass the CORS preflight response to the next handler.
* `optionsSuccessStatus`: Provides a status code to use for successful `OPTIONS` requests, since some legacy browsers (IE11, various SmartTVs) choke on `204`.

The default configuration is the equivalent of:

```json
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
```