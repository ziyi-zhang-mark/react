import Expenses from "./components/Expenses/Expenses";

const App = () => {
  const expenses = [
    { title: "title1", amount: 1, date: new Date(2021, 1, 28) },
    { title: "title2", amount: 2, date: new Date(2021, 2, 28) },
    { title: "title3", amount: 3, date: new Date(2021, 3, 28) },
  ];

  return (
    <div>
      <h2>Let's get started!</h2>
      <Expenses items={expenses} />
    </div>
  );
};

export default App;
