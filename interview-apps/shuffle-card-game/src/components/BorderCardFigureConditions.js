// convert 11 to J, 12 to Q, 13 to K
const BorderCardFigureConditions = ({ number }) => {
  return (
    <p>
      {number === 11 ? "J" : number === 12 ? "Q" : number === 13 ? "K" : number}
    </p>
  );
};

export default BorderCardFigureConditions;
