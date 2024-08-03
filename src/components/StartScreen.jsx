import React from "react";
import QuestionsLimit from "./QuestionsLimit";
import FilterQuestions from "./FilterQuestions";
import { useQuiz } from "../context/QuizContextProvider";

function StartScreen() {
  const {  startGame, questionLevel } = useQuiz();



  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>Let's test your react skills</h3>
      <div className="config-btns">
        <button className="btn btn-ui" onClick={startGame}>
          Start Quiz
        </button>
        <QuestionsLimit questionLevel={questionLevel}/>
        <FilterQuestions questionLevel={questionLevel}/>
      </div>
    </div>
  );
}

export default StartScreen;
