import React from 'react'
import { useQuiz } from '../context/QuizContextProvider'

function Progress() {

  const {index,numQuestions,points,maxPoints,answer} = useQuiz();

  return (
    <header className='progress'>
        <progress max={numQuestions} value={index + Number(answer !== null)}/>

        <p><strong>{index+1}</strong>/{numQuestions} Questions</p>

        <p><strong>{points}</strong>/{maxPoints} Points</p>
    </header>
  )
}

export default Progress