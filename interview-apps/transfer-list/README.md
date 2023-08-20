### create a map from an array

```js
const values = [
  ["name", "John"],
  ["age", 30],
];
const map = new Map(values);
```

### create a map from an object

```js
const values = {
  name: "John",
  age: 30,
};
// use Object.entries on an object to convert it into an array of key-value pairs
const map = new Map(Object.entries(values));
```

### Array from

```js
// from a string
Array.from("foo");
// [ "f", "o", "o" ]

// from a set
const set = new Set(["foo", "bar", "baz", "foo"]);
Array.from(set);
// [ "foo", "bar", "baz" ]

// from a map
const map = new Map([
  [1, 2],
  [2, 4],
  [4, 8],
]);
Array.from(map);
// [[1, 2], [2, 4], [4, 8]]

const mapper = new Map([
  ["1", "a"],
  ["2", "b"],
]);
Array.from(mapper.values());
// ['a', 'b'];

Array.from(mapper.keys());
// ['1', '2'];

// using arrow function
Array.from([1, 2, 3], (x) => x + x);
// [2, 4, 6]

// Generate a sequence of numbers
// Since the array is initialized with `undefined` on each position,
// the value of `v` below will be `undefined`
Array.from({ length: 5 }, (v, i) => i);
// [0, 1, 2, 3, 4]
```
