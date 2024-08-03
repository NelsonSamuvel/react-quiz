import React, { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();


const QUESTION_SECS = 30;

const initialState = {
  questions: [],

  //loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: JSON.parse(localStorage.getItem("highScore")) || {
    easy: 0,
    medium: 0,
    hard: 0,
  },
  secondsRemaining: null,
  questionsLimit: null,
  questionLevel: "easy",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived": {
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        questionsLimit: action.payload.filter(
          (question) => question.level === state.questionLevel
        ).length,
      };
    }

    case "dataFailed": {
      return { ...state, status: "error" };
    }

    case "questionsLimit": {
      return { ...state, questionsLimit: action.payload };
    }

    case "setQuestionLevel": {
      return {
        ...state,
        questionLevel: action.payload,
        questionsLimit: state.questions.filter(
          (question) => question.level === action.payload
        ).length,
      };
    }

    case "startGame": {
      const configQuestions = state.questions
        ?.filter((question) => question.level === state.questionLevel)
        .slice(0, state.questionsLimit);

      return {
        ...state,
        status: "active",
        secondsRemaining: configQuestions.length * QUESTION_SECS,
      };
    }

    case "newAnswer": {
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }

    case "nextQuestion": {
      return { ...state, index: state.index + 1, answer: null };
    }

    case "finish": {
      const isNewHighScore =
        state.points > state.highScore[state.questionLevel];

      let newHighScore;
      if (isNewHighScore) {
        newHighScore = {
          ...state.highScore,
          [state.questionLevel]: state.points,
        };
        localStorage.setItem("highScore", JSON.stringify(newHighScore));
      }
      return {
        ...state,
        status: "finished",
        highScore: isNewHighScore ? newHighScore : state.highScore,
      };
    }

    case "restart": {
      console.log(state.questions);

      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        questionsLimit: state.questions.filter(
          (question) => question.level === state.questionLevel
        ).length,
      };
    }

    case "timer": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    }

    default: {
      throw new Error("Invalid action type");
    }
  }
}


function QuizContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    secondsRemaining,
    questionsLimit,
    questionLevel,
  } = state;

  const configQuestions = questions
  ?.filter((question) => question.level === questionLevel)
  .slice(0, questionsLimit);

const maxPoints = configQuestions.reduce((prev, cur) => prev + cur.points, 0);

const numQuestions = configQuestions.length;


  async function fetchData() {
    try {
      const res = await fetch("http://localhost:8000/questions");
      const data = await res.json();
      dispatch({ type: "dataReceived", payload: data });
    } catch (err) {
      dispatch({ type: "dataFailed" });
    }
  }

  function startGame(){
    dispatch({ type: "startGame" })
  }

  function setQuestionsLimit(e){
    dispatch({ type: "questionsLimit", payload: Number(e.target.value) })
  }

  return (
    <QuizContext.Provider
      value={{
        fetchData,
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        questionsLimit,
        questionLevel,
        startGame,
        setQuestionsLimit,
        maxPoints,
        numQuestions,
        dispatch,
        configQuestions
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const contextValues = useContext(QuizContext);
  if (contextValues === undefined) throw new Error("something went wrong");
  return contextValues;
}

export default QuizContextProvider;
