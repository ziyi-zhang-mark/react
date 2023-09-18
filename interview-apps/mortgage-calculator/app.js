import { useState } from 'react';
import './styles.css';

export default function App() {
  const [monthlyPayment, setMonthlyPayment] = useState();
  const [totalPayment, setTotalPayment] = useState();
  const [totalInterest, setTotalInterest] = useState();

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const loanAmount = formData.get("loan-amount");
    console.log(loanAmount);

    const monthlyInterestRate = formData.get("interest-rate") / 100 / 12;
    console.log(monthlyInterestRate);

    const loanTermInMonths = formData.get("loan-term") * 12;
    console.log(loanTermInMonths);

    // Calculate monthly mortgage payment.
    const monthlyPaymentAmount =
      (loanAmount * monthlyInterestRate) /
      (1 -
        1 /
          Math.pow(
            1 + monthlyInterestRate,
            loanTermInMonths,
          ));

    const totalPayment = monthlyPaymentAmount * loanTermInMonths;

    setMonthlyPayment(monthlyPaymentAmount.toFixed(2));
    setTotalPayment(totalPayment.toFixed(2));
    setTotalInterest((totalPayment - loanAmount).toFixed(2));
  }

  return (
    <div className="calculator">
      <form 
        className="calculator-form"
        onSubmit={onSubmit}
      >
        <div>
          <label htmlFor="loan-amount">Loan Amount: </label>
          <input 
            id="loan-amount"
            type="number" 
            name="loan-amount"
            min="1"
            required
          />
        </div>

        <div>
          <label htmlFor='loan-term'>Loan Term (years): </label>
          <input 
            id="loan-term" 
            type="number" 
            name="loan-term" 
            min="1"
            required
          />
        </div>

        <div>
          <label htmlFor='interest-rate'>Interest Rate (%): </label>
          <input 
            id="interest-rate" 
            type="number" 
            name="interest-rate"
            min="0.01"
            step="0.01"
            required
          />
        </div>
        
        <div>
          <button>Calculate</button>
        </div>
      </form>

      <div className="calculator-results">
        <div>
          Monthly Payment Amount: <strong>{monthlyPayment}</strong>
        </div>
        <div>
          Total Payment Amount: <strong>{totalPayment}</strong>
        </div>
        <div>
          Total Interest Paid: <strong>{totalInterest}</strong>
        </div>
      </div>
    </div>
  );
}
