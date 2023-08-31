import { useState } from 'react';

import './styles.css';

export default function App() {
  const [flightOption, setFlightOption] = useState("one-way");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState(departureDate);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (flightOption === 'one-way') {
      alert(
        `You have booked a one-way flight on ${departureDate}`,
      );
      return;
    } else {
      alert(
        `You have booked a return flight, departing on ${departureDate} and returning on ${returnDate}`,
      );
    }
  }

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const TODAY = formatDate(new Date());
  console.log(TODAY);

  return (
    <form 
      className='flight-booker'
      onSubmit={onSubmitHandler}>

      <select
        value={flightOption}
        onChange={(event) => setFlightOption(event.target.value)}
      >
        <option value='one-way'>One way flight</option>
        <option value='return'>Return flight</option>
      </select>

      <input 
        type="date"
        value={departureDate}
        onChange={(event) => {
          setDepartureDate(event.target.value);
          console.log(event.target.value);
        }}
        min={TODAY}
      />
      {flightOption === 'return' && (
        <input 
          type="date"
          value={returnDate}
          min={departureDate}
          onChange={(event) => {
            setReturnDate(event.target.value);
            console.log(event.target.value);
          }}
        />
      )}
      <button>Book</button>
    </form>
  );
}
