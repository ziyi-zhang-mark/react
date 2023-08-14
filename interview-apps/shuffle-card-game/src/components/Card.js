import CardCenterElement from "./CardCenterElement";
import BorderCardFigureConditions from "./BorderCardFigureConditions";
import { useEffect } from "react";

export const Card = ({
  cardObj,
  color,
  symbol,
  name,
  scoreArray,
  cardsNumber,
}) => {
  useEffect(() => {
    if (scoreArray.length < cardsNumber) {
      scoreArray.push(cardObj.score);
      console.log(`Card cardObj.score: ${cardObj.score}`);
    }
  }, [scoreArray, cardObj, cardsNumber]);

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
        Card pts: {cardObj.score}
      </p>
      <div className={`card-content__inner ${name}`}>
        {/* top left section of the card */}
        <div className={`card-content-inner__border-top ${color}`}>
          <div className="top-symbol">
            <BorderCardFigureConditions number={cardObj.number} />
            <span className="top-symbol-sigle">{symbol}</span>
          </div>
        </div>
        {/* center of the card */}
        <div
          className={`card-content-inner__center grid-${cardObj.number} ${color}`}
        >
          <CardCenterElement
            number={cardObj.number}
            symbol={symbol}
            name={name}
          />
        </div>
        {/* bottom right of the card */}
        <div className={`card-content-inner__border-bottom ${color}`}>
          <div />
          <div className="bottom-symbol">
            <span className="bottom-symbol-sigle">{symbol}</span>
            <p>{cardObj.number}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
