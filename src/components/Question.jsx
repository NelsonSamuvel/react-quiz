import React from "react";
import Options from "./Options";
import { useQuiz } from "../context/QuizContextProvider";

function Question() {

  const {configQuestions,index} = useQuiz();

  return (
    <div>
      <h4>{configQuestions[index].question}</h4>
      <Options question={configQuestions[index]} />
    </div>
  );
}

export default Question;
