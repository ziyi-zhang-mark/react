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

`useEffect()` - run after the component re-evaluation when dependency is changed. You must add all "things" you use in your effect function to the dependency list, if those "things" could change because your component (or some parent component) re-rendered.

```js
const [enteredEmail, setEnteredEmail] = useState();
const [enteredPassword, setEnteredPassword] = useState();
const [formIsValid, setFormIsValid] = useState();

useEffect(() => {
  const timer = setTimeout(() => {
    console.log("Checking for validity");
    setFormIsValid(
      enteredEmail.includes("@") && enteredPassword.trim().length > 6
    );
  }, 500);

  // effect cancallation
  return () => {
    console.log("Clean up");
    clearTimeout(timer);
  };
}, [enteredEmail, enteredPassword]); // dependency list
```

`useReducer()` - replacement for `useState()` if need more powerful state management.

```js
const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const [emailState, dispatchEmail] = useReducer(emailReducer, {
  value: "",
  isValid: false,
});

dispatchEmail({ type: "USER_INPUT", val: "value" });
dispatchEmail({ type: "USER_BLUR" });
```

`useContext()`

```js
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
});
export default AuthContext;

// provide
<AuthContext.Provider
  value={{
    isLoggedIn: false,
    onLogout: logoutHandler, // can pass function as well
  }}
>
  <div>...</div>
</AuthContext.Provider>;

// consume
const context = useContext(AuthContext);
context.isLoggedIn;
context.onLogout;
```
