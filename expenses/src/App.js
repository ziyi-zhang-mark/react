import React, { useState } from "react";

import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

const DUMMY_EXPENSES = [
  { id: 1, title: "title1", amount: 1, date: new Date(2021, 1, 28) },
  { id: 2, title: "title2", amount: 2, date: new Date(2021, 2, 28) },
  { id: 3, title: "title3", amount: 3, date: new Date(2021, 3, 28) },
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  };
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default App;
