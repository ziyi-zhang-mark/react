import FigureCardCenter from "./FigureCardCenter";

// render the center section of a card, 1-10 or J Q K
const CardCenterElement = ({ number, symbol, name }) => {
  return (
    <>
      {[...Array(Number(number))].map((_, index) => {
        return (
          <span className="center-card" key={index}>
            <span className="center-symbol-sigle">
              {number >= 0 && number <= 10 ? symbol : ""}
            </span>
          </span>
        );
      })}
      {number === 11 || number === 12 || number === 13 ? (
        <FigureCardCenter number={number} name={name} />
      ) : (
        ""
      )}
    </>
  );
};

export default CardCenterElement;
