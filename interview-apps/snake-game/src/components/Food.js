import "../App.css";

// position prop is a coordinate (x, y) representing a food
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
