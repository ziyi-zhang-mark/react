import "../App.css";

// snake prop is an array of small boxes with (x, y) value
export const Food = ({ position }) => {
  return (
    <div>
      <div
        className="food"
        style={{ left: `${position.x}%`, top: `${position.y}%` }}
      ></div>
    </div>
  );
};
