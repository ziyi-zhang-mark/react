## Types

number, string, boolean, arrays, objects, functions, parameters, null, undefined

```ts
let hobbies: string[];

// object type definition, person need to conform to the type definition
let person: {
  name: string;
  age: number;
};

let people: {
  name: string;
  age: number;
}[];

//  union type
let course: string | number = "";

// type alias
type Person = {
  name: string;
  age: number;
};
let person: Person;
let people: Person[];

// Functions & types
function add(a: number, b: number): number {
  return a + b;
}
// void

// Generics
function insertAtBeginning<T>(array: T[], value: T) {
  return [value, ...array];
}
const array = [1, 2, 3];
const updatedArray = insertAtBeginning(array, -1); // updatedArray will be type number[]
```
