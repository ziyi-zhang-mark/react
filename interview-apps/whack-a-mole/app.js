import { useState, useRef, useEffect } from 'react';
import './styles.css';

const generateMolePositions = (moleAtOnce, totalCount) => {
  const indices = Array.from({ length: totalCount }, (_, index) => index);
  shuffle(indices);
  const newMolePostions = indices.slice(0, moleAtOnce);
  return new Set(newMolePostions);
}

const shuffle = (array) => {
  for (let i = array.length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currIndex = i - 1;
    swap(array, currIndex, randomIndex);
  }
}

const swap = (array, i, j) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

const Game = ({ 
  rows = 3, 
  cols = 3, 
  gameDuration = 15, 
  moleAtOnce = 1,
  molesAppearingInterval = 1500
}) => {
  const totalCount = rows * cols;
  // set of indices which are visible moles
  const [visibleSet, setVisibleSet] = useState(new Set());
  // the time left for the current round
  const [timeLeft, setTimeLeft] = useState(gameDuration);

  const [score, setScore] = useState(null);
  const [running, setRunning] = useState(false);
  const countDownTimer = useRef(null);

  const startGame = () => {
    setRunning(true);
    setTimeLeft(gameDuration);
    setScore(0);

    // interval to decrement the timer to 0
    countDownTimer.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft <= 0) {
          clearInterval(countDownTimer.current);
          setRunning(false);
          return 0;
        }
        return timeLeft - 1;
      })
    }, 1000);
  }

  useEffect(() => {
    // clear countdown timer on unmount
    return () => {
      clearInterval(countDownTimer.current);
    };
  }, []);

  useEffect(() => {
    let generateMoleTimer;
    if (running) {
      // generate new mole to show at intervals
      generateMoleTimer = setInterval(() => {
        setVisibleSet(generateMolePositions(moleAtOnce, totalCount));
      }, molesAppearingInterval)
    }
    return () => {
      clearInterval(generateMoleTimer);
      setVisibleSet(new Set());
    };
  }, [running]);

  const whackMole = (index) => {
    console.log(`index: ${index}`);
    if (!visibleSet.has(index)) return;
    const newVisibleSet = new Set(visibleSet);
    newVisibleSet.delete(index);
    setVisibleSet(newVisibleSet);
    setScore((score ?? 0) + 1);
  }

  return (
    <div className="app">
      <div className="header">
        {score === null ? (
          <button
            onClick={startGame}
          >
            Start Game
          </button>
        ) : (
          <div className="round-information">
            <p>Score: {score}</p>
            {!running && <button
              onClick={startGame}
            >
              Play Again
            </button>}
            <p>Time Left: {timeLeft}</p>
          </div>
        )}
      </div>

      <div className="grid" 
        style={{ 
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`
        }}>
        {Array(totalCount).fill(null).map((_, index) => {
          return (
            <button 
              className="grid__cell"
              key={index}
              onClick={() => whackMole(index)}
            >
              <img 
                src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png"
                className={`grid__cell-contents mole-head ${visibleSet.has(index) && 'mole-head--visible'}`}
              />
              <img 
                src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png"
                className="grid__cell-contents mole-hill"
              />
            </button>
          )
        })}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Game rows={3} cols={3} />
  )
}
