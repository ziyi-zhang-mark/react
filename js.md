## Javascript Basics

- let vs const
- Arrow Functions

  - Besides a shorter syntax, they offer advantages when it comes to keeping the scope of the `this` keyword.

    ```js
    const multiply = (number) => number * 2;
    ```

- Export and Import

  ```js
  const person = {
    name: "max",
  };
  export default person;

  export const clean = () => {};
  export const baseData = 10;

  import prs from "./person.js";
  import { baseData } from "./utility.js";
  import { clean } from "./utility.js";
  import { something as Something } from "./utility.js";
  import * as bundled from "./utility.js";
  ```

- Classes

  ```js
  // Old version
  class Human {
    constructor() {
      this.gender = "male";
    }
    printGender() {
      console.log(this.gender);
    }
  }
  class Person extends Human {
    constructor() {
      super();
      this.name = "Max";
      this.gender = "female";
    }

    printMyName() {
      console.log(this.name);
    }
  }
  const myPerson = new Person();
  myPerson.printMyName(); // Max
  myPerson.printGender(); // female

  // ES6+ syntax
  class Human {
    gender = "male";
    printGender = () => {
      console.log(this.gender);
    };
  }
  class Person extends Human {
    name = "Max";
    gender = "female";

    printMyName = () => {
      console.log(this.name);
    };
  }
  const myPerson = new Person();
  myPerson.printMyName(); // Max
  myPerson.printGender(); // female
  ```

- Spread & Rest operators

  ```js
  // Spread: split up array elements or object properties
  const newArray = [...oldArray, 1, 2];
  const newObject = { ...oldObject, newProp: 5 };

  // Rest: merge a list of arguments into an array
  const filter = (...args) => {
    return args.filter((el) => el === 1);
  };
  ```

- Array and Object are reference type, others are primitive type

  ```js
  const person = {
    name: "max",
  };
  // shallow copy
  const secondPerson = {
    ...person,
  };
  ```
