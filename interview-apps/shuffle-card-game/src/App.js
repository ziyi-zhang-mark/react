import CardsWrapper from "./components/CardsWrapper";
import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <div className="App">
      <CardsWrapper cardsNumber={5} />
    </div>
  );
}

export default App;
