import { useState } from "react";

import "./App.css";
import { Food } from "./components/Food";
import { Snake } from "./components/Snake";

const initialSnake = {
  snake: [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 8, y: 0 },
  ],
  direction: "right",
  speed: 100,
};

const randomFoodPosition = () => {
  const position = { x: 0, y: 0 };
  let x = Math.floor(Math.random() * 96);
  let y = Math.floor(Math.random() * 96);
  position.x = x - (x % 4); // get multiple of 4
  position.y = y - (y % 4);
  return position;
};

const App = () => {
  const [snake, setSnake] = useState(initialSnake.snake);
  const [foodPosition, setFoodPosition] = useState(randomFoodPosition);
  const [lastDirection, setLastDirection] = useState(initialSnake.direction);
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  return (
    <div className="App">
      <Snake snake={initialSnake.snake} />
      <Food position={randomFoodPosition()} />
    </div>
  );
};

export default App;
