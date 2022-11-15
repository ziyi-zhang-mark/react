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

### Optimization

`React.memo(DemoOutput)` - avoid re-evaluation of the component and its child conponents if no props changed.

`useCallback(() => {}, [])` - store the function so that function will be pointed to the original one after re-evaluated. Dependency list is the state where the function should be re-created when they are changed.

```js
const toggleHandler = useCallback(() => {
  if (allowToggle) {
    setShowParagraph((prevState) => !preState);
  }
}, [allowToggle]);
```

`useMemo()` - store some data which will need intensive calculation or resources.

```js
const listItems = useMemo(() => [5, 3, 1, 10, 9], [])
<DemoList title={listTitle} items={listItems} />

const { items } = props;
const sortedList = useMemo(() => {
  return items.sort((a, b) => a - b);
}, [items]);
```

### Class Based Component

![](media/class-based-component.png)

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

### Send Requests

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
}
```
