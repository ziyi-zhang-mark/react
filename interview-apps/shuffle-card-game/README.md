Create a small app where 5 random cards (or more) appear at each reload. Never have the same number on several cards, no matter the color.

[Shuffle Card Game 1](https://blog.devgenius.io/react-js-tutorial-how-to-implement-a-shuffle-card-game-from-scratch-c994277d38b3)

[Shuffle Card Game 2](https://blog.devgenius.io/react-js-tutorial-how-to-implement-a-shuffle-card-game-from-scratch-part2-198dc972023c)

```js
// create an array with length number, then map it
[...Array(Number(number))].map((_, index) => {}

// randomly choose an item from an array
const randomSymbols = symbols[Math.floor(Math.random() * symbols.length)];

// a hook that pick a random card from a list, a card cannot be picked twice
const useRandomValueFromArray = () => {
  let availableIndices = [];

  const randomValueFromArray = (array) => {
    if (availableIndices.length === 0) {
      for (let i = 0; i < array.length; i++) {
        availableIndices.push(i);
      }
    }
    let availableIndex = Math.floor(Math.random() * availableIndices.length);
    let indexInArray = availableIndices[availableIndex];
    availableIndices.splice(availableIndex, 1);
    return array[indexInArray];
  };

  return {
    randomValueFromArray,
  };
};

export default useRandomValueFromArray;

// use of the hook
import useRandomValueFromArray from "../hooks/useRandomValueFromArray";
const { randomValueFromArray } = useRandomValueFromArray();
randomValueFromArray(numbers);

// array reduce example
const totalScore = scoreArray.reduce((total, item) => total + item, 0);
```
