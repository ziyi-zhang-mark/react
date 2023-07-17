import Card from "./Card";
import { colors, numbers, symbols } from "../data";
import useRandomValueFromArray from "../hooks/useRandomValueFromArray";
import { Fragment, useEffect, useState } from "react";
import Cumulator from "./Cumulator";

// Generate a list of cards, length of the list is determined by the cardsNumber parameter
const CardsWrapper = ({ cardsNumber }) => {
  const { randomValueFromArray } = useRandomValueFromArray();
  const [scoreArray] = useState([]);

  useEffect(() => {
    console.log("scoreArray: ", scoreArray);
  }, [scoreArray]);

  return (
    <>
      <Cumulator scoreArray={scoreArray} />
      <div className="card-wrapper">
        {[...Array(Number(cardsNumber))].map((_, index) => {
          const randomIndex = Math.floor(Math.random() * symbols.length);
          const randomSymbol = symbols[randomIndex];
          const randomCard = randomValueFromArray(numbers);
          const color =
            randomSymbol.name === "spade" || randomSymbol.name === "club"
              ? colors[1].color
              : colors[0].color;
          return (
            <Fragment key={index}>
              <Card
                cardsNumber={cardsNumber}
                scoreArray={scoreArray}
                randomValue={randomCard}
                numberArray={randomCard}
                symbol={randomSymbol.symbol}
                name={randomSymbol.name}
                color={color}
              />
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default CardsWrapper;
