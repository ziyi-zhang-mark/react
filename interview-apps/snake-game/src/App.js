import { useState, useEffect, useRef, useCallback } from "react";

import "./App.css";
import { Food } from "./components/Food";
import { Snake } from "./components/Snake";

const initialSnake = {
  snake: [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 8, y: 0 },
  ],
  direction: "ArrowRight",
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
  // snake = [{x,y},{x,y},{x,y},{x,y},...]
  const [snake, setSnake] = useState(initialSnake.snake);
  const [foodPosition, setFoodPosition] = useState(randomFoodPosition);
  const [lastDirection, setLastDirection] = useState(initialSnake.direction);
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const playgroundRef = useRef();

  // method to update snake array values on keyboard event
  const move = useCallback(() => {
    const tmpSnake = [...snake];
    let x = tmpSnake[tmpSnake.length - 1].x;
    let y = tmpSnake[tmpSnake.length - 1].y;
    switch (lastDirection) {
      case "ArrowUp":
        y -= 4;
        break;
      case "ArrowRight":
        x += 4;
        break;
      case "ArrowDown":
        y += 4;
        break;
      case "ArrowLeft":
        x -= 4;
        break;
      default:
        break;
    }
    tmpSnake.push({ x, y });
    console.log(tmpSnake);

    // if new position does not have food, shift() to remove tail, otherwise, set new food postion
    if (x !== foodPosition.x || y !== foodPosition.y) {
      tmpSnake.shift();
    } else {
      setFoodPosition(randomFoodPosition());
    }
    setSnake(tmpSnake);
  }, [snake]); // the move function will be recreated when snake state changes

  useEffect(() => {
    if (!isStarted) return;

    //if snake array last element touches the box boundary then game over
    if (
      snake[snake.length - 1].x === 100 ||
      snake[snake.length - 1].x === 0 ||
      snake[snake.length - 1].y === 100 ||
      snake[snake.length - 1].y === -4
    ) {
      setIsGameOver(true);
      return;
    }

    // interval needed to continuously move the snake by manipulating snake array item's x & y value every 'speed' milliseconds
    const interval = setInterval(move, initialSnake.speed);
    console.log(`interval created`);

    return () => {
      clearInterval(interval);
      console.log(`interval cleared`);
    };
  }, [snake, isStarted, move]);

  return (
    <div
      className="App"
      onKeyDown={(e) => {
        console.log(e.key);
        setLastDirection(e.key);
      }}
      ref={playgroundRef}
      tabIndex={0} // make the div focusable, otherwise, onKeyDown cannot be catched in this div
    >
      {isStarted && <div className="count"> score: {snake.length - 3}</div>}

      {!isStarted && (
        <>
          <button
            onClick={() => {
              setIsStarted(true);
              playgroundRef.current.focus(); // focus to receive key down event
            }}
          >
            Start
          </button>
          <div className="arrow-msg text">Press Arrows keys to play!</div>
        </>
      )}

      {isGameOver && (
        <>
          <div className="game-over text">Game Over!</div>
          <button
            onClick={() => {
              setIsStarted(true);
              setIsGameOver(false);
              setSnake(initialSnake.snake);
              setLastDirection(initialSnake.direction);
              playgroundRef.current.focus();
            }}
          >
            Restart
          </button>
        </>
      )}
      <Snake snake={snake} />
      {!isGameOver && <Food position={foodPosition} />}
    </div>
  );
};

export default App;
