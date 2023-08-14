import { useEffect, useState } from "react";

const Cumulator = ({ scoreArray }) => {
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    const totalScore = scoreArray.reduce((total, item) => total + item, 0);
    setFinalScore(totalScore);
    console.log("Cumulator total score: ", totalScore);
  }, [scoreArray]);

  return (
    <span style={{ color: "white", fontSize: 22 }}>
      Score: {finalScore} Pts
    </span>
  );
};

export default Cumulator;
