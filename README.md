# API
```js
var normalize = require("stream-normalize-eol");
var stream = normalize("\n");
// Pipe input and output streams to `stream`.
```

## normalize(format)

Returns a duplex stream that normalizes the end of line characters to the
desired format. `format` is a string that can be one of the following:

- **"\n"**: Unix format (LF) / default
- **"\r\n"**: Windows format (CR/LF)
- **"\r"**: Old Mac format (CR)

# Example

```js
var normalize = require("stream-normalize-eol");
var stream = normalize();   // default is "\n"

stream.write("First\r\nSecond\rThird");
stream.end();

stream.on("data", function(chunk) {
  console.log(JSON.stringify(chunk.toString()));
});

// Prints "First\nSecond\nThird"
```

```js
var fs = require("fs");
var normalize = require("stream-normalize-eol");

fs.writeFileSync("hello.txt", "Hello\nWorld", "utf8");

var input = fs.createReadStream("hello.txt");
var stream = normalize("\r\n");

input.pipe(stream);

stream.on("data", function(chunk) {
  console.log(JSON.stringify(chunk.toString()));
});

// Prints "Hello\r\nWorld"
```

# license

MIT