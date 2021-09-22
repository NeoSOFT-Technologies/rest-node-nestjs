# Compression

We have used this [middleware](http://expressjs.com/en/resources/middleware/compression.html) library in order to compress the response.

The majority of the browsers support 3 type of encodings gzip, deflate and br, and it’s almost always sent by the browser for any request sent to the servers using the `Accept-Encoding` request header, but it’s up to the server if they want to encoder the response and by doing so they need to communicate which encoding they’re using to encode using the `Content-Encoding` response header.

The objective of Compression

1) Compression can greatly decrease the size of the response body, thereby increasing the speed of a web app. By using this compression, we can improve the performance of our Node.js applications as our payload size is dramatically reduced above 70%.
2) The following compression codings are supported:
    - deflate
    - gzip
3) Gzip (gzip): The most widely used compression format for server and client interactions. It is based on the Deflate algorithm and is compatible with all current browsers

## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install compression
```

## Using compression middleware
```
app.use(compression({
    filter: shouldCompress,
    threshold: 0
  }));
```

`filter` decide if the answer should be compressed or not, depending on the 'shouldCompress' function
`threshold` means the byte threshold for the response body size before considering compression, the default is 1 kB. Currently the threshold is set to 0 bytes which means every response body is going to be compressed. We can tweak this parameter according to our convenience.

> When compression middleware is not used, response body size is 4.3kB
![Console](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/images/uncompressed.PNG?raw=true)

> When compression middleware is used, response body size reduces to 1.3kB. We can also see response header `Content-Encoding` is set to `gzip`
![Console](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/main/wiki/images/compressed.PNG?raw=true)


For a complete list of properties to choose from, see the documentation [here](http://expressjs.com/en/resources/middleware/compression.html).

