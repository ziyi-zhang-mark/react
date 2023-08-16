import "../App.css";

// snake prop is an array of coordinates (x, y) representing the snake body
// {20, 0} will render a box(width=15px, height=15px) in the coordinate
// 以4为间隔，left 以 4% 向左或向右，so that 一共可以有 25 rows/cols
export const Snake = ({ snake }) => {
  return (
    <div>
      {snake.map((box, index) => (
        <div
          key={index}
          className="snake-body"
          style={{ left: `${box.x}%`, top: `${box.y}%` }}
        ></div>
      ))}
    </div>
  );
};
