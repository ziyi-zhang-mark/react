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