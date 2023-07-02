import Card from "./Card";

const CardsWrapper = ({ cardsNumber }) => {
  return (
    <div className="card-wrapper">
      {[...Array(Number(cardsNumber))].map((_, index) => {
        return <Card key={index} symbol="♥" color="red" number={index + 1} />;
      })}
    </div>
  );
};

export default CardsWrapper;
