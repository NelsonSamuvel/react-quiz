import React from "react";

function QuestionsLimit({filteredQuestions, questionsLimit,questionLevel, dispatch }) {


    


  return (
    <div className="limit-questions">
      <input
        type="range"
        max={filteredQuestions?.length}
        min={1}
        value={questionsLimit}
        onChange={(e) =>
          dispatch({ type: "questionsLimit", payload: Number(e.target.value) })
        }
      />
      <p>Questions : {questionsLimit}</p>
    </div>
  );
}

export default QuestionsLimit;
