import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./components/Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextBtn from "./components/NextBtn";
import Progress from "./components/Progress";
import ScoreScreen from "./components/ScoreScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const QUESTION_SECS = 30;

async function fetchData(dispatch) {
  try {
    const res = await fetch("http://localhost:8000/questions");
    const data = await res.json();
    dispatch({ type: "dataReceived", payload: data });
  } catch (err) {
    dispatch({ type: "dataFailed" });
  }
}

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
      return {
        ...state,

        status: "active",
        secondsRemaining: state.questions.length * QUESTION_SECS,
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

const App = () => {
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

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            questions={questions}
            questionLevel={questionLevel}
            dispatch={dispatch}
            questionsLimit={questionsLimit}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={configQuestions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextBtn
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <ScoreScreen
            highScore={highScore}
            points={points}
            maxPoints={maxPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
