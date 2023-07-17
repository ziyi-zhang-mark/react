import CardCenterElement from "./CardCenterElement";
import BorderCardFigureConditions from "./BorderCardFigureConditions";
import { useEffect, useRef } from "react";

const Card = ({
  numberArray,
  color,
  symbol,
  name,
  randomValue,
  scoreArray,
  cardsNumber,
}) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted) {
      return;
    }
    isMounted.current = true;
    if (
      numberArray.id === randomValue.id &&
      scoreArray.length < Number(cardsNumber)
    ) {
      scoreArray.push(randomValue.score);
      isMounted.current = false;
    }
  }, [isMounted, scoreArray, numberArray, randomValue, cardsNumber]);

  return (
    <div className="card-container">
      <p
        style={{
          position: "absolute",
          width: "14rem",
          textAlign: "center",
          color: "lightgrey",
        }}
      >
        Card pts: {randomValue.score}
      </p>
      <div className={`card-content__inner ${name}`}>
        {/* top left section of the card */}
        <div className={`card-content-inner__border-top ${color}`}>
          <div className="top-symbol">
            <BorderCardFigureConditions number={numberArray.number} />
            <span className="top-symbol-sigle">{symbol}</span>
          </div>
        </div>
        {/* center of the card */}
        <div
          className={`card-content-inner__center grid-${numberArray.number} ${color}`}
        >
          <CardCenterElement
            number={numberArray.number}
            symbol={symbol}
            name={name}
          />
        </div>
        {/* bottom right of the card */}
        <div className={`card-content-inner__border-bottom ${color}`}>
          <div />
          <div className="bottom-symbol">
            <span className="bottom-symbol-sigle">{symbol}</span>
            <p>{numberArray.number}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
