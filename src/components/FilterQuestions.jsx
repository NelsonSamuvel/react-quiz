import React from "react";
import { useQuiz } from "../context/QuizContextProvider";

function FilterQuestions({ questionLevel }) {

  const {dispatch} = useQuiz();

  return (
    <select
      className="level"
      value={questionLevel}
      onChange={(e) =>
        dispatch({ type: "setQuestionLevel", payload: e.target.value })
      }
    >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  );
}

export default FilterQuestions;
