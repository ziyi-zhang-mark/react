import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";

const Expenses = (props) => {
  return (
    <Card className="expenses">
      {props.items.map((item) => {
        return <ExpenseItem expense={item}></ExpenseItem>;
      })}
    </Card>
  );
};

export default Expenses;
