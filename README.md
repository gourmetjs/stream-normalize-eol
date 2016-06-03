# stream-normalize-eol

A duplex stream that normalizes the end of line characters.

# API

```js
var normalize = require("stream-normalize-eol");
var stream = normalize("\n");

// pipe input and output streams to `stream`.
```

## normalize(format)

Returns a [duplex stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex)
that normalizes the end of line characters to the desired format.
`format` is a string that can be one of the following:

- **"\n"**: Unix format (LF) / default
- **"\r\n"**: Windows format (CR/LF)
- **"\r"**: Old Mac format (CR)

Internally, this stream assumes that the input data is encoded as `utf8`.
If you supply non-`utf8` encoded multi-byte data, it will not be processed correctly.

# Example

```js
var fs = require("fs");
var normalize = require("stream-normalize-eol");

fs.writeFileSync("hello.txt", "Hello\nWorld", "utf8");

var input = fs.createReadStream("hello.txt");
var stream = normalize("\r\n");

stream.on("data", function(chunk) {
  console.log(JSON.stringify(chunk.toString()));
});

input.pipe(stream);

// prints "Hello\r\nWorld"
```

# License

MIT