import "../App.css";

// snake prop is an array of small boxes with (x, y) value
export const Snake = ({ snake }) => {
  return (
    <div>
      {snake.map((box) => (
        <div
          className="snake-body"
          style={{ left: `${box.x}%`, top: `${box.y}%` }}
        ></div>
      ))}
    </div>
  );
};
