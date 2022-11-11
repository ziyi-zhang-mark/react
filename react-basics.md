### React Basics and Components

npx create-react-app react-complete-guide

index.js first executed

Components are just javascript functions

props in components

Declarative - you define the desired outcome, let the library to figure out individual steps.

### React State and Handling Events

update state with previous state.

```js
setUserInput((prevState) => {
  return { ...prevState, enteredTitle: event.target.value };
});
```

### Lists and Conditional Content

### Styling React Components

Dynamic CSS classes

```js
<div className={`form-control ${!isValid && "invalid"}`}>
```

### Fragments, Portals and Refs

Fragment(<>, or <React.Fragment>) - an empty wrapper component.
Portal - render elements outside the component itself in the html file.
Ref - try to read data from a DOM element in code.

### Effects, Reducers and Context
