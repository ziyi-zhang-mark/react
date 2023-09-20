// https://www.greatfrontend.com/questions/javascript/get
const get = (object, path, defaultValue) => {
  const pathArray = Array.isArray(path) ? path : path.split(".");

  let index = 0;
  const length = pathArray.length;

  // null == undefined => true
  // null === undefined => false
  while (object != null && index < length) {
    object = object[pathArray[index]];
    index++;
  }

  const value = index === length ? object : undefined;
  return value !== undefined ? value : defaultValue;
}

// debounce()
function debounce(func, wait = 0) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args); // this in the returned function scope
    }, wait); 
  }
}

let i = 0;
function increment() {i++}
const debouncedIncrement = debounce(increment, 100);

// t = 0: Call debouncedIncrement().
debouncedIncrement(); // i = 0

// t = 50: i is still 0 because 100ms have not passed.
//  Call debouncedIncrement() again.
debouncedIncrement(); // i = 0

// t = 100: i is still 0 because it has only
//  been 50ms since the last debouncedIncrement() at t = 50.

// t = 150: Because 100ms have passed since
//  the last debouncedIncrement() at t = 50,
//  increment was invoked and i is now 1

// throttle()
function throttle(func, wait) {
  let shouldThrottle = false;

  return function(...args) {
    if (shouldThrottle) return;

    shouldThrottle = true;
    setTimeout(() => {shouldThrottle = false}, wait);
    func.apply(this, args);
  }
}

const throttledIncrement = throttle(increment, 100);
// t = 0: Call throttledIncrement(). i is now 1.
throttledIncrement(); // i = 1

// t = 50: Call throttledIncrement() again.
// i is still 1 because 100ms have not passed.
throttledIncrement(); // i = 1

// t = 101: Call throttledIncrement() again. i is now 2.
// i can be incremented because it has been more than 100ms
// since the last throttledIncrement() call at t = 0.
throttledIncrement(); // i = 2