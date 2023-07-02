import CardCenterElement from "./CardCenterElement";
import BorderCardFigureConditions from "./BorderCardFigureConditions";

const Card = ({ number, color, symbol, name }) => {
  return (
    <div className="card-container">
      <div className={`card-content__inner ${name}`}>
        {/* top left section of the card */}
        <div className={`card-content-inner__border-top ${color}`}>
          <div className="top-symbol">
            <BorderCardFigureConditions number={number} />
            <span className="top-symbol-sigle">{symbol}</span>
          </div>
        </div>
        {/* center of the card */}
        <div className={`card-content-inner__center grid-${number} ${color}`}>
          <CardCenterElement number={number} symbol={symbol} name={name} />
        </div>
        {/* bottom right of the card */}
        <div className={`card-content-inner__border-bottom ${color}`}>
          <div />
          <div className="bottom-symbol">
            <span className="bottom-symbol-sigle">{symbol}</span>
            <p>{number}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
