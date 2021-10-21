"use strict";
// fs
// fs stand for file system
const fs = require("fs");

// for creating a server
const http = require("http");

// for creating route
const url = require("url");

const program = "hello world";
console.log(program);

// create a server
const server = http.createServer((req, res) => {
  // create a routing
  const urlReq = req.url;
  // console.log(urlReq);
  if (urlReq === "/hello") {
    res.end("hello from the server");
  } else if (urlReq === "/lorem") {
    res.end("i am lorem");
  }
});
//listing
server.listen(3000, () => {
  console.log("your server is on");
});
