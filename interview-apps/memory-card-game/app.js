import { useState, useRef, useCallback, useEffect } from 'react';
import './styles.css';

const emojis = [
  '🐵',
  '🐶',
  '🦊',
  '🐱',
  '🦁',
  '🐯',
  '🐴',
  '🦄',
  '🦓',
  '🦌',
  '🐮',
  '🐷',
  '🐭',
  '🐹',
  '🐻',
  '🐨',
  '🐼',
  '🐽',
  '🐸',
  '🐰',
  '🐙',
];

const shuffle = (array) => {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    // swap the randomly selected index with the current index i-1
    const temp = array[randomIndex];
    array[randomIndex] = array[i - 1];
    array[i - 1] = temp;
  }
} 

const generateCards = (totalCount, matchCount) => {
  const numGroup = totalCount / matchCount;
  const emojiList = emojis.slice(0, numGroup);
  const cards = emojiList.concat(emojiList);
  shuffle(cards);
  return cards;
}

const MemoryGame = ({ rows, cols, matchCount = 2 }) => {
  const totalCount = rows * cols;
  const initialCards = generateCards(totalCount, matchCount);

  const [cards, setCards] = useState(initialCards);
  // currrently flipped cards
  const [flipped, setFlipped] = useState([]);
  // set of matched cards
  const [matched, setMatched] = useState(new Set());

  // delay before cards are flipped back
  const waitTimer = useRef(null);
  const [gameCompleted, setGameCompleted] = useState(false);

  const onFlip = (index) => {
    let currentFlipped = flipped;

    // when the user selects more cards before the delay has passed. 
    // waitTimer has to be cleared and the currently unmatched open cards
    // have to be flipped back.
    if (waitTimer.current != null) {
      clearTimeout(waitTimer.current);
      waitTimer.current = null;
      currentFlipped = [];
    }

    const newFlipped = [...currentFlipped, index]
    setFlipped(newFlipped);

    if (newFlipped.length < matchCount) {
      return;
    }

    const allFlippedAreSame = newFlipped.every((index) => 
      cards[newFlipped[0]] === cards[index]
    );

    if (allFlippedAreSame) {
      const newMatchedSet = new Set(matched);
      newMatchedSet.add(cards[newFlipped[0]]);
      setMatched(newMatchedSet);
      setFlipped([]);

      if (newMatchedSet.size * matchCount === totalCount) {
        setGameCompleted(true);
      }
      return ;
    }

    // function will run after delay after assignment
    waitTimer.current = setTimeout(() => {
      setFlipped([]);
      waitTimer.current = null;
    }, 2000);
  }

  const resetGame = useCallback(() => {
    waitTimer.current = null;
    setCards(generateCards(totalCount, matchCount));
    setFlipped([]);
    setMatched(new Set());
    setGameCompleted(false);
  }, [totalCount, matchCount]);

  useEffect(() => resetGame(), [resetGame])

  return (
    <div className="app">
      <div className="grid" style={{ 
        gridTemplateRows: `repeat(${rows}, var(--size))`,
        gridTemplateColumns: `repeat(${cols}, var(--size))`
      }}>
        {cards.map((card, index) => {
          const isMatched = matched.has(cards[index]);
          const isFlipped = flipped.includes(index);
          return (
            <button 
              key={index}
              className={`card ${isMatched && 'card--revealed'}`}
              disabled={isMatched || isFlipped}
              onClick={() => onFlip(index)}
            >
            {(isMatched || isFlipped) && card}
            </button>
          )
        })}
      </div>
      {gameCompleted && <button onClick={resetGame}>Play again</button>}
    </div>
  );
}

export default function App() {
  return <MemoryGame rows={4} cols={4} />
}
