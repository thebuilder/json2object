#json2object
Node tool to sync read local .json files. Very useful when generating static pages using Jade.

## Usage

```js
var j2o = require('json2object');

var list = j2o.getArray('test/data');
console.log(list);
```

This will read all *.json* files in 'test/data', and return a flat array with the data.