import React from "react";

function ScoreScreen({ points, maxPoints, highScore, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <div>
      <p className="result">
        You scored {points} out of {maxPoints}({Math.ceil(percentage)}%)
      </p>
      <div className="scorecard">
        <h3>HighScores</h3>
        <p>Easy : {highScore.easy}</p>
        <p>Medium : {highScore.medium}</p>
        <p>Hard : {highScore.hard}</p>
        <button
        className="btn restart-btn"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
      </div>

     
    </div>
  );
}

export default ScoreScreen;
