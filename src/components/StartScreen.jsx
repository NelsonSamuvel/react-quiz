import React from "react";
import QuestionsLimit from "./QuestionsLimit";
import FilterQuestions from "./FilterQuestions";

function StartScreen({ numQuestions, dispatch ,questionsLimit,questionLevel,questions}) {



  
  const filteredQuestions = questions.filter(question=>question.level === questionLevel);



  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{filteredQuestions.length} questions to test your react skills</h3>
      <div className="config-btns">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "startGame" })}
        >
          Start Quiz
        </button>
        <QuestionsLimit filteredQuestions={filteredQuestions}  questionLevel={questionLevel} questionsLimit={questionsLimit} numQuestions={numQuestions}  dispatch={dispatch}/>
        <FilterQuestions questionLevel={questionLevel} dispatch={dispatch}/>
      </div>
    </div>
  );
}

export default StartScreen;
