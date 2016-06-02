"use strict";

var test = require("tape");
var normalize = require("../lib/normalize.js");

function _run(stream, input, callback) {
  var text = "";

  stream.setEncoding("utf8");

  stream.on("data", function(chunk) {
    text += chunk;
  });

  stream.on("end", function() {
    callback(text);
  });

  input.forEach(function(chunk) {
    stream.write(chunk);
  });
  stream.end();
}

test("'\\n' format test", function(t) {
  _run(normalize(), [
    "\n",
    "Hello\r",
    "\nWorld\r",
    "\r\n",
    "!"
  ], function(text) {
    t.equal(text, "\nHello\nWorld\n\n!");
    t.end();
  });
});

test("'\\r\\n' format test", function(t) {
  _run(normalize("\r\n"), [
    "\r\n",
    "\nHello",
    "\nWorld\n\r",
    "!"
  ], function(text) {
    t.equal(text, "\r\n\r\nHello\r\nWorld\r\n\r\n!");
    t.end();
  });
});

test("'\\r' format test", function(t) {
  _run(normalize("\r"), [
    "\r",
    "Hello\r",
    "\nWorld\n",
    "\r\n",
    "!"
  ], function(text) {
    t.equal(text, "\rHello\rWorld\r\r!");
    t.end();
  });
});

test("Multi-byte encoded text", function(t) {
  _run(normalize(), [
    "Hello\r",
    new Buffer([10, 0xED, 0x95]),
    new Buffer([0x9C, 0xEA, 0xB8]),
    new Buffer([0x80, 13]),
    "\r\n",
    "!"
  ], function(text) {
    t.equal(text, "Hello\n\uD55C\uAE00\n\n!");
    t.end();
  });
});
