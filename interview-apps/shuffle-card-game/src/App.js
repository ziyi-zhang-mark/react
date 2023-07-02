import CardsWrapper from "./components/CardsWrapper";
import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <div className="App">
      <CardsWrapper cardsNumber={5} />
      <button onClick={() => window.location.reload()}>Reload Cards</button>
    </div>
  );
}

export default App;
