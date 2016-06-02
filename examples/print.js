var normalize = require("../lib/normalize.js"/*"stream-normalize-eol"*/);
var stream = normalize();   // default is "\n"

stream.write("First\r\nSecond\rThird");
stream.end();

stream.on("data", function(chunk) {
  console.log(JSON.stringify(chunk.toString()));
});

// Prints "First\nSecond\nThird"