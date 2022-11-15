import { useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const enterTaskHandler = async (taskText) => {
    setIsLoading(true);
    setError();

    try {
      const response = await fetch(
        "https://react-projects-37027-default-rtdb.firebaseio.com/tasks.json",
        {
          method: "POST",
          body: JSON.stringify({ text: taskText }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      const generatedId = data.name;
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    } catch (error) {
      setError(error.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
