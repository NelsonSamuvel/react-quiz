import React from "react";
import { useQuiz } from "../context/QuizContextProvider";

function Options({ question }) {

  const {dispatch, answer} = useQuiz();

  const isAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option 
          ${index === answer ? "answer" : ""} 
          ${
            isAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }
          `}
          disabled={isAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
