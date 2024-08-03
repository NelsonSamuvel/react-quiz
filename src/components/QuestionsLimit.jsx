import React from "react";
import { useQuiz } from "../context/QuizContextProvider";

function QuestionsLimit({questionLevel}) {

  const {questionsLimit,setQuestionsLimit,questions} = useQuiz();

  const filteredQuestions = questions.filter(
    (question) => question.level === questionLevel
  );

  return (
    <div className="limit-questions">
      <input
        type="range"
        max={filteredQuestions?.length}
        min={1}
        value={questionsLimit}
        onChange={setQuestionsLimit}
      />
      <p>Questions : {questionsLimit}</p>
    </div>
  );
}

export default QuestionsLimit;
