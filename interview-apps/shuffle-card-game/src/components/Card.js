const Card = ({ number, color, symbol, name }) => {
  return (
    <div className="card-container">
      <div className={`card-content__inner ${name}`}>
        {/* top left section of the card */}
        <div className={`card-content-inner__border-top ${color}`}>
          <div className="top-symbol">
            <p>{number}</p>
            <span className="top-symbol-sigle">{symbol}</span>
          </div>
        </div>
        {/* center of the card */}
        <div className={`card-content-inner__center grid-${number} ${color}`}>
          {[...Array(Number(number))].map((_, index) => {
            return (
              <span className="center-card" key={index}>
                <span className="center-symbol-sigle">{symbol}</span>
              </span>
            );
          })}
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
