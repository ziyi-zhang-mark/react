import { colors, numbers, symbols } from "../data";
import useRandomValueFromArray from "../hooks/useRandomValueFromArray";
import Card from "./Card";

// Generate a list of cards, length of the list is determined by the cardsNumber parameter
const CardsWrapper = ({ cardsNumber }) => {
  const { randomValueFromArray } = useRandomValueFromArray();
  return (
    <div className="card-wrapper">
      {[...Array(Number(cardsNumber))].map((_, index) => {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        const randomSymbol = symbols[randomIndex];
        const color =
          randomSymbol.name === "spade" || randomSymbol.name === "club"
            ? colors[1].color
            : colors[0].color;
        return (
          <Card
            key={index}
            symbol={randomSymbol.symbol}
            name={randomSymbol.name}
            color={color}
            number={randomValueFromArray(numbers).number}
          />
        );
      })}
    </div>
  );
};

export default CardsWrapper;
