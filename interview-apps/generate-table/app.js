import { useState } from 'react';
import './styles.css';

const Table = ({ rows, columns }) => {
  console.log(`${rows} ${columns}`);
  return (
    <table>
      <tbody>
        {Array.from({ length: rows }, (v, i) => i).map((_, row) => (
          <tr>
            {Array.from({ length: columns }, (v, i) => i).map((_, col) => (
              <td>
                {col % 2 === 0
                  ? rows * col + (row + 1)
                  : rows * (col + 1) - row
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function App() {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const rows = data.get('rows');
    const cols = data.get('cols');
    setRows(+rows);
    setColumns(+cols);
  }

  return (
    <div className="app">
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="rows">Rows</label>
          <input 
            id="rows"
            name="rows"
            type="number"
            min={1}
          />
        </div>

        <div>
          <label htmlFor="cols">Columns</label>
          <input 
            id="cols"
            name="cols"
            type="number"
            min={1}
          />
        </div>
        
        <button>Submit</button>
      </form>

      {rows !== 0 && columns !== 0 && <Table rows={rows} columns={columns} />}
    </div>
  );
}
