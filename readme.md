## Information
Node tool to sync read local .json files. Very useful when generating static pages using Jade.

## Usage

```js
var j2o = require('json2object');

var list = j2o.getArray('test/data');
console.log(list);
```

This will read all *.json* files in 'test/data', and return a flat array with the data.

## API

###getArray
Reads all the *.json* files in a directory, and returns an array containing the file data as objects.

#####Example
```
[ { test: 'first' },
  { test: 'third' },
  { test: 'second' },
  { test: 'second 2' } ]
```

###getObjectArray
Reads all the *.json* files in a directory, and returns an array with the file data parsed into an object containing: "name", "path" and "data".

Use this if you need to know where the data came from.

#####Example
```
[ { name: 'first', path: './', data: { test: 'first' } },
  { name: 'third', path: 'subdir/deep/', data: { test: 'third' } },
  { name: 'second', path: 'subdir/', data: { test: 'second' } },
  { name: 'second2', path: 'subdir/', data: { test: 'second 2' } } ]
```

###getObject
Reads all the *.json* files in a directory, and returns an Object matching the tree structure. File names are converted into object keys, that can be used for lookup.

#####Example
```
{ first: { test: 'first' },
  subdir: 
   { deep: { third: [Object] },
     second: { test: 'second' },
     second2: { test: 'second 2' } } }
```

###merge
Reads all the *.json* files in a directory, and merges them into a single Object using *extend*.

#####Example
```
{ test: 'second 2' }
```