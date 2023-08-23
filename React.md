### React Basics and Components

```sh
npx create-react-app react-complete-guide
```

index.js first executed

Components are just javascript functions

props in components

Declarative - you define the desired outcome, let the library to figure out individual steps.

### React State and Handling Events

Update state with previous state using a function in setter.

```js
// DO NOT
setUserInput({ ...userInput, enteredTitle: event.target.value });
// DO
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

- Fragment(<>, or <React.Fragment>) - an empty wrapper component
- Portal - render elements outside the component itself in the html file

```js
<div id="overlays"></div>;

const portalElement = document.getElementById("overlays");
ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement);
ReactDOM.createPortal(
  <ModalOverlay>{props.children}</ModalOverlay>,
  portalElement
);
```

- Ref - try to read data from a DOM element in code

```js
const inputRef = useRef();
useEffect(() => {
  inputRef.current.focus();
}, []);

<input ref={inputRef} />;
```

### Effects, Reducers and Context hooks

- `effect` - anything other than render UI and react to user input. e.g. store data in browser storate, send http requests, set timers

- `useEffect(() => {}, [despendencies])` - a function that executed after component re-evaluation if the specified dependency changed. Add "everything" you use in the effect function as a dependency - i.e. all state variables and functions you use in there.

```js
let myTimer;
const MyComponent = (props) => {
  const [timerIsActive, setTimerIsActive] = useState(false);
  const { timerDuration } = props;

  useEffect(() => {
    if (!timerIsActive) {
      setTimerIsActive(true);
      myTimer = setTimeout(() => {
        setTimerIsActive(false);
      }, timerDuration);
    }
  }, [timerIsActive, timerDuration]);
  // setTimerIsActive - not a dependency, React guarantees the state update function never changes
  // myTimer - not a dependency, not a component internal variable
  // setTimeout - not a dependency, it's a browser built-in API
};
```

Implement debounce using `useEffect()`, only check for validity after email and password have no change for 500 ms

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

  // effect cleanup
  return () => {
    console.log("Clean up");
    clearTimeout(timer);
  };
}, [enteredEmail, enteredPassword]);
```

- `useReducer()` - for more complex state, e.g. multiple states, multiple ways of changing it. It's a replacement for `useState()` if need more powerful state management.

```js
const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);
```

```js
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return initialState;
};

const initialState = { value: "", isValid: false };
const [emailState, dispatchEmail] = useReducer(emailReducer, initialState);

dispatchEmail({ type: "USER_INPUT", val: "value" });
dispatchEmail({ type: "USER_BLUR" });
```

- `useContext()`
- React Context is not optimized for high frequency changes, use Redux instead!
- React Context should not be used to replace all component communications and props, components should still be configurable via props and short prop chains.

```js
export const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// provide
<AuthContextProvider>
  <App />
</AuthContextProvider>;

// consumer
const context = useContext(AuthContext);
context.isLoggedIn;
context.onLogout;
```

### Optimization

`React.memo(DemoOutput)` - avoid re-evaluation of the component and its child conponents if no props changed.

`useCallback(() => {}, [])` - store the `function`` so that function will be pointed to the original one after re-evaluated. Dependency list is the state where the function should be re-created when they are changed.

```js
const toggleHandler = useCallback(() => {
  if (allowToggle) {
    setShowParagraph((prevState) => !preState);
  }
}, [allowToggle]);
```

`useMemo()` - store some `data` which will need intensive calculation or resources.

```js
// memorize the sortedList, until the dependency e.g. items are changed
const { items } = props;
const sortedList = useMemo(() => {
  return items.sort((a, b) => a - b);
}, [items]);
```

### Class Based Component

#### State and Event Handler

```js
import { Component } from "react";

class User extends Component {
  render() {
    return <li>{this.props.name}</li>; // returns JSX elements
  }
}

class Users extends Component {
  constructor() {
    super();
    this.state = {
      showUsers: true,
    };
  }

  toggleUsersHandler() {
    // setState will merge object other than override
    this.setState((prevState) => {
      return { showUsers: !prevState.showUsers };
    });
  }

  render() {
    const usersList = (
      <ul>
        {DUMMY_USERS.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}
```

#### Class Based Component Lifecycle

![](media/class-based-component-lifecycle.png)

```js
class UserFinder extends Component {
  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  // called only once when the component is rendered for the first time
  componentDidMount() {
    this.setState({ filteredUsers: DUMMY_USERS });
  }

  // called when re-evaluated
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: DUMMY_USERS.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}
```

#### Class Based Component Context

#### Class Based Component Only Error Boundary

```js
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    console.log(error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong!</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

### Send HTTP Requests

```js
// using promise
const fetchMoviesHandler = () => {
  fetch("https://swapi.dev/api/films/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const transformedMovies = data.results.map((movie) => ({
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      }));
      setMovies(transformedMovies);
    });
};

// using async/await
async function fetchMoviesHandler() {
  const response = await fetch("https://swapi.dev/api/films/");
  const data = await response.json();
  const transformedMovies = data.results.map((movie) => ({
    id: movie.episode_id,
    title: movie.title,
    openingText: movie.opening_crawl,
    releaseDate: movie.release_date,
  }));
  setMovies(transformedMovies);
}

// POST request
async function addMovieHandler(movie) {
  const response = await fetch("url", {
    method: "POST",
    body: JSON.stringify(movie),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
}
```

### Redux

![](media/how-redux-works.png)

React Redux(redux-react-demo) vs React Context(meals)

- In more complex apps, managing React Context can lead to deeply nested JSX Provider code or huge "Context Provider" components
- React Context is not optimized for high-frequency state changes

### React Router

### Custom Hook Function

```js
export const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0);

  // will rerun when forwards changes
  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) {
        setCounter((prevCounter) => prevCounter + 1);
      } else {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]);

  return counter;
};

// use
const counter = useCounter();
```
