# React

[3 coding challenges for React developer](https://hackernoon.com/top-3-coding-challenges-for-mid-level-react-developers)

### promise/async/await

[fetch/async/await](https://dmitripavlutin.com/javascript-fetch-async-await/)

- fetch() - return a promise

```js
fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

- aync/await

```js
async function fetchUsers() {
  const response = await fetch(API_URL);
  const users = await response.json();
  return users;
}
fetchUsers().then((users) => {
  users; // fetched users
});
```

### async/await in React component

```js
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1/comments"
    );
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ui>
        {data.map((item) => {
          return (
            <>
              <li>Id: {item.id}</li>
              <li>Name: {item.name}</li>
              <li>Email: {item.email}</li>
              <hr />
            </>
          );
        })}
      </ui>
    </div>
  );
};

export default App;
```

### Loop through

```js
// loop through obj
var obj = { 0: "a", 1: "b", 2: "c" };
for (var i in obj) {
  console.log(i, ":", obj[i]);
}

// loop through array
var arr = [1, 2, 3, 4];
arr.forEach((val, index) => console.log(val, index));

var arr = ["a", "b", "c", "d"];
for (var i in arr) {
  console.log(i, ":", arr[i]);
}
for (var value of arr) {
  console.log(value);
}
```

### Populate array

4 Ways to populate an array

```js
let filledArray = Array(10)
  .fill(null)
  .map((_, i) => ({ hello: "bye" }));
```

```js
let filledArray = new Array(10);
for (let i = 0; i < filledArray.length; i++) {
  filledArray[i] = { hello: "bye" };
}
```

```js
Array.from({ length: 5 }, (v, i) => i);  // [0, 1, 2, 3, 4]
Array.from([1, 2, 3], (x) => x + x);  // [2, 4, 6]
Array.from('foo');  // ["f", "o", "o"]
```

```js
let filledArray = [...new Array(10)].map(() => {'hello': 'bye'});
```

### array operations

```js
arr.filter(Boolean);

// the same as writing:
arr.filter(function (x) {
  return Boolean(x);
});
var a = [1, 2, "b", 0, {}, "", NaN, 3, undefined, null, 5];
var b = a.filter(Boolean); // [1, 2, "b", {}, 3, 5];

// slice - will return a new array
const cities = ["Tokyo", "Cairo", "Los Angeles", "Paris", "Seattle"];
cities.slice(2);  // ["Los Angeles", "Paris", "Seattle"]
cities.slice(-2);  // ["Paris", "Seattle"]
cities.slice(2, 4);  // ["Los Angeles", "Paris"]

// splice will modify the original array, and return removed items only, otherwise return an empty array []
const food = ['pizza', 'cake', 'salad', 'cookie'];
// add burrito at the index 1, and delete count is 0
food.splice(1, 0, "burrito");  // ['pizza', 'burrito', 'cake', 'salad', 'cookie']
// at the index 2, and delete count is 1
food.splice(2, 1);  // ['pizza', 'cake', 'cookie']
```

### CSS Grid

[CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/#aa-grid-properties)

```css
.board {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-columns: 1fr 1fr 1fr; */
}
```

### CSS Flexbox

[CSS flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
