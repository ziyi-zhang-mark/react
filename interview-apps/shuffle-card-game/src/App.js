import CardsWrapper from "./components/CardsWrapper";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CardsWrapper cardsNumber={5} />
      <button onClick={() => window.location.reload()}>Reload Cards</button>
    </div>
  );
}

export default App;
