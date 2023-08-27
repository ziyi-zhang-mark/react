In a deck of paired cards, the player needs to select a matching pair in consecutive turns. The player wins the game when all matching pairs are selected.

[Build a Card Memory Game with React](https://javascript.plainenglish.io/building-a-card-memory-game-in-react-e6400b226b8f)
[Code](https://codesandbox.io/s/loving-lena-f99hk8?file=/src/card.js)

[Flip a card with 2 images(front and back)](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_flip_card)

```js
// shuffle algorithm
const swap = (array, i, j) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};
const shuffleCards = (array) => {
  for (let i = array.length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    swap(array, currIndex, randomIndex);
    // another swap method
    // [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
```
