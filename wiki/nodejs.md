# NodeJS Training 
## Prerequisites
- JavaScript  
- Typescript 
- npm   

## Topics
 
### 1. Introduction & Foundation 
- Introduction 
- The Node.js framework 
    - Explain what Node.js is 
    - Describe how Node.js works 
    - Identify when to use Node.js 
    - Create and run a Node.js script from the command line 
- Event Loop 
- What is the Event Loop? 
    - Event Loop Explained 
    - Phases Overview 
    - Why use process.nextTick()? 
- Single threaded Architecture 
    - V8 JavaScript Engine   
    - C library - libuv 
    - Process & Thread 
    - Thread pool 
    - Understand Node JS Single Thread Event Loop Workflow 

### 2. Node Projects 
- Node Project Manager 
    - Initialize Node.js projects 
    - npm and nvm 
- package.json configuration file 
- Global vs local package installation 

### 3. Starting with Node js  
- Global Objects (http://nodejs.org/api/globals.html) 
    - __filename 
    - __dirname 
    - module 
    - exports 
    - process 
    - Buffer 
- Console (http://nodejs.org/api/console.html) 
    - log 
    - info 
    - error 
    - warn 
    - dir 
    - time 
    - timeEnd 
    - trace 
    - assert 
- Timers (http://nodejs.org/api/timers.html) 
    - setTimeout(callback, delay, [arg], [...]) 
    - clearTimeout(t) 
    - setInterval(callback, delay, [arg], [...]) 
    - clearInterval(t) 
    - setImmediate(callback, [arg], [...]) 
    - clearImmediate(immediateObject) 
    - unref() 
    - ref() 
- Modules (http://nodejs.org/api/modules.html) 
- Debugging(https://nodejs.org/en/docs/guides/debugging-getting-started) 
    - --inspect 
    - Security Implications 
    - node-inspector(https://github.com/node-inspector/node-inspector)

### 4. Express JS  
- Model View Controller Pattern 
- Template Engine 
- Using REST 
- Middleware  

### 5. Unit Testing 
- Basic Introduction 
- Assert (http://nodejs.org/api/assert.html) 
- Functional and Integration testing 
- Implementation of unit testing using Mocha or Chai 

### 6. Express JS Practical   
- Setup the new Project  
- Add the unit test cases

### 7. Working with Asynchronous Programming 
- Asynchronous basics 
- Callback Functions 
- Working with Promises 
- API Calls

### 8. Building a HTTP Server with Node JS using HTTP APIs 
- HTTP protocol (http://nodejs.org/api/http.html) 
    - To use the HTTP server and client one must require('http'). 
- HTTP server & HTTPS Server 
- URL (http://nodejs.org/api/url.htm) 
    - This module has utilities for URL resolution and parsing. Call require('url') to use it.
- Query String (http://nodejs.org/api/querystring.html) 
    - This module provides utilities for dealing with query strings. Call require('querystring') to use it 
    
### 9. File System 
- Basic (http://nodejs.org/api/fs.html) 
    - To use this module do require('fs'). 
    - All the methods have asynchronous and synchronous forms. 
- Synchronous vs Asynchronous IO 
- File Read and Write 
- Util (http://nodejs.org/api/util.html) 
- Path 
    - Use require('path') to use this module. 
    - This module contains utilities for handling and transforming file paths. 
    - Almost all these methods perform only string transformations. 

### 10. Buffers, Streams, and Events  
- Buffers for binary Data (http://nodejs.org/api/buffer.html) 
    - Buffer is used to dealing with binary data  
    - Buffer is similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap  
- Event Emitter(http://nodejs.org/api/events.html) 
    - addListener 
    - on 
    - once 
    - removeListener 
    - removeAllListeners 
    - setMaxListeners 
    - listeners 
    - emit 
- Stream (http://nodejs.org/api/stream.html) 
    - Flowing vs non-flowing streams 
    - Streams are readable, writable, or both. 
    - readable streams  
    - http responses on the client 
        - http requests on the server 
        - fs read streams 
        - zlib streams (https://nodejs.org/api/zlib.html) 
        - crypto streams (https://nodejs.org/api/crypto.html) 
        - tcp sockets 
        - child process stdout and stderr 
        - process.stdin 
    - writable streams  
        - http requests on the client 
        - http responses on the server 
        - fs write streams 
        - zlib streams 
        - crypto streams 
        - tcp sockets 
        - child process stdin 
        - process.stdout 
        - process.stderr 
    - Duplex streams 
        - tcp sockets 
        - zlib streams 
        - crypto streams 
    - Transform streams 
        - zlib streams 
        - crypto streams 
- File System and Security (Example - Build one system) 
    - API to upload file 
    - Wrapper to upload file 
- Web-hooks

### 11. Multi-Processing in NodeJS
- Process(http://nodejs.org/api/process.html) 
- Child Process (http://nodejs.org/api/child_process.html) 
    - Node provides a tri-directional popen facility through the child_process module. 
    - It is possible to stream data through a child's stdin, stdout, and stderr in a fully non-blocking way. 
- Cluster API for multi-core servers 
- Multi-Processing 
- Provides a few basic operating-system related utility functions 
- Use require('os') to access this module. (http://nodejs.org/api/os.html) 

### 12. Socket.io, The Front-End & A Chat App
- Basic of Socket IO 
- Example & Implementation of events, listener, broadcast & emitters

### 13. Putting It All Together 
- Problem Statement - Event Management System (NodeJS + Postgres/Mongo DB/MySQL) 
    - User 
        - Register (User can register) 
        - Login (User login) 
        - Logout (User logout) 
        - Change Password (User can change his password) 
        - Update Password (When request for reset password is done, to set new password) 
        - Reset Password (In API response send info regarding to update-password) 
    - Event (Authentication required for doing operations on event) 
        - Create (User can create Event) 
        - Invite (Users) // Just store emails and when that user login in he can see his created event list and also events in which he is invited 
        - List (Invited users when login can see their events as well events events in which they are invited in, also display creator name in list) 
        - Sorting 
        - Date Filter 
        - Search Filter 
        - Event Detail + list of users invited (API to get specific event and invites) 
        - Event update (Event Update) 
    - Notes 
        - Consider models as per your knowledge 
        - Create Postman for above APIs 
        - Add the unit test cases for APIs 
- Skills covered in Node.js tests 
    - Knowledge of JavaScript 
    - Asynchronous programming 
    - Managing databases from Node.js (e.g. MongoDB) 
    - Processing data structures 
    - Functional programming with JavaScript 
    - Object-Oriented programming with JavaScript 
    - Unit Test cases 

 