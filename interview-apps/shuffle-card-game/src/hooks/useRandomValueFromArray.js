// a hook that pick a random card from a list, a card cannot be picked twice
export const useRandomValueFromArray = () => {
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
