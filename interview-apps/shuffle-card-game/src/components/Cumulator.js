import { useEffect, useState } from "react";

const Cumulator = ({ scoreArray }) => {
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    console.log("scoreArray in Cumulator: ", scoreArray);
    const totalScore = scoreArray.reduce((total, item) => total + item, 0);
    setFinalScore(totalScore);
    console.log("total score: ", totalScore);
  }, [setFinalScore, scoreArray]);

  return (
    <span style={{ color: "white", fontSize: 22 }}>
      Score: {finalScore} Pts
    </span>
  );
};

export default Cumulator;
