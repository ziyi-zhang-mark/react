import { useContext } from "react";

import { TodosContext } from "../store/todos-context";
import TodoItem from "./TodoItem";
import classes from "./Todos.module.css";

const Todos: React.FC = () => {
  const todosContext = useContext(TodosContext);
  return (
    <ul className={classes.todos}>
      {todosContext.items.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          text={item.text}
          // onRemoveTodo={() => props.onRemoveTodo(item.id)} // works too
          onRemoveTodo={todosContext.removeTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};
export default Todos;
