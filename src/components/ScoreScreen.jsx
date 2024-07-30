import React from "react";

function ScoreScreen({ points, maxPoints, highScore, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <div>
      <p className="result">
        You scored {points} out of {maxPoints}({Math.ceil(percentage)}%)
      </p>
      <div className="highscore">
        <h3>HighScores</h3>
        <p>
          <span>Easy : {highScore.easy}</span>
          <span>Medium : {highScore.medium}</span>
          <span>Hard : {highScore.hard}</span>
        </p>
      </div>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default ScoreScreen;
