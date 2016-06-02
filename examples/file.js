var fs = require("fs");
var normalize = require("../lib/normalize.js"/*"stream-normalize-eol"*/);

fs.writeFileSync("hello.txt", "Hello\nWorld", "utf8");

var input = fs.createReadStream("hello.txt");
var stream = normalize("\r\n");

input.pipe(stream);

stream.on("data", function(chunk) {
  console.log(JSON.stringify(chunk.toString()));
});

// Prints "Hello\r\nWorld"
