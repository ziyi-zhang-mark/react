// filter()
Array.prototype.myFilter = function (callbackFn, thisArg) {
  const len = this.length;
  const results = [];

  for (let k = 0; k < len; k++) {
    const kValue = this[k];
    if (Object.hasOwn(this, k) && callbackFn.call(thisArg, kValue, k, this)) {
      results.push(kValue);
    }
  }
  return results;
};

// reduce()
Array.prototype.myReduce = function (callbackFn, initialValue) {
  const noInitialValue = initialValue == undefined;
  const len = this.length;
  if (noInitialValue  && len === 0) {
    throw new Error();
  }
  let result = noInitialValue ? this[0] : initialValue;
  let startIndex = noInitialValue ? 1 : 0;

  for (let k = startIndex; k < len; k++) {
    // sparse array [1, 2, , 3], this[2] = NaN
    // 0: 1, 1: 2, 3: 3
    // if (Object.hasOwn(this, k)) {
      result = callbackFn(result, this[k], k, this);
    // }
  }
  return result;
};

// bind()
Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const original = this;
  return (...args) => {
    return original.apply(thisArg, [...boundArgs, ...args]);
  }
};

// flatten()
// Single-level arrays are unaffected.
flatten([1, 2, 3]); // [1, 2, 3]

// Inner arrays are flattened into a single level.
flatten([1, [2, 3]]); // [1, 2, 3]
flatten([
  [1, 2],
  [3, 4],
]); // [1, 2, 3, 4]

// Flattens recursively.
flatten([1, [2, [3, [4, [5]]]]]); // [1, 2, 3, 4, 5]

function flatten(value) {
  const res = [];
  const copy = value.slice();

  while (copy.length > 0) {
    const item = copy.shift(); // remove the first element in the array, return the shifted element.
    if (Array.isArray(item)) {
      copy.unshift(...item); // add new elements to the begining of the array
    } else {
      res.push(item);
    }
  }
  return res;
}