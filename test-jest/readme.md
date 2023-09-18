## Unit Tests

Jest Cheatsheet

`npx rtl-book serve roles-notes.js`


Open a webpage to visualize the component and query elements
```js
screen.logTestingPlaygroundURL();
screen.debug();
```

```js
import { render, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('it shows 2 inputs and a button', () => {
  // render the component
  render(<UserForm />);

  // manipulate the component or find an element in it
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  // assertion - the component is doing as expected
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test('it calls onUserAdd when the form is submitted', () => {
  const mock = jest.fn();
  // render the component
  render(<UserForm onUserAdd={mock} />);

  // manipulate the component or find an element in it
  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });

  // simulate typing
  user.click(nameInput);
  user.keyboard('abc');
  user.click(emailInput);
  user.keyboard('abc@gmail.com');

  const button = screen.getByRole('button');
  user.click(button)

  // assertion - the component is doing as expected
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: 'abc', email: 'abc@gmail.com'})
});

const renderComponent = () => {
  const users = [
    { name: 'jane', email: 'jane@gamil.com' },
    { name: 'sam', email: 'sam@gamil.com' },
  ]
  render(<UserList users={users} />);
  return { users }
}
test('render one row per user', () => {
  renderComponent();
  // find all rows in the table
  const rows = within(screen.getByTestId('users')).getAllByRole('row');
  // assertion - correct number of rows
  expect(rows).toHaveLength(2);
});

test('render the name and email of each user', () => {
  const { users } = renderComponent()

  for (let user of users) {
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});

test('getBy, queryBy findBy when find 0 element', async () => {
  // check an element exists
  expect(() => screen.getByRole('textbox')).toThrow();
  // check an element not exists
  expect(screen.queryByRole('textbox')).toEqual(null);
  // async - make sure an element eventually exists
  let errorThrown = false;
  try {
    await screen.findByRole('textbox');
  } catch (err) {
    errorThrown = true;
  }
  expect(errorThrown).toEqual(true);
}

test('getBy, queryBy findBy when find 1 element', async () => {
  expect(screen.getByRole('list')).toBeInTheDocument();
  expect(screen.queryByRole('list')).toBeInTheDocument();
  expect(await screen.findByRole('list')).toBeInTheDocument();
}

test('getAllBy, queryAllBy findAllBy when find > 1 elements', async () => {
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
  expect(screen.queryAllByRole('listitem')).toHaveLength(3);
  expect(await screen.findAllByRole('listitem')).toHaveLength(3);
}
```

### Matchers
```js
expect().toBeInTheDocument()
toBeEnabled()
toHaveClass()
toHaveTextContent()
toHaveValue()
toHaveLength()
toEqual()
toContain()
toThrow()
toHaveBeenCalled()

getByRole()
getByLabelText()
getByPlaceholderText()
getByText()
getByDisplayValue()
getByAltText()
getByTitle()
getByTestId()
```

### Custom matcher
```js
function toContainRole(container, role, quantity = 1) {
  const elements = within(container).queryAllByRole(role);
  if (elements.length === quantity) {
    return {
      pass: true
    };
  }
  return {
    pass: false,
    message: () => `Expected to find ${quantity} ${role} elements. Found ${elements.length} instead.`
  };
}
expect.extend({ toContainRole });

// how to use the custom matcher
const form = screen.getByRole('form');
expect(form).toContainRole('link', 2);

### Module mocks

 jest.mock('../tree/FileIcon', () => {
  return () => {
    return 'File Icon Component'
  };
 });

 jest.mock('../hooks/useRepositories', () => {
  return () => {
    return {
      data: [
        {name: 'react'},
        {name: 'css'},
        {name: 'js'}
      ]
    }
  }
 });
```