import React, { useEffect } from "react";
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
import { useQuiz } from "./context/QuizContextProvider";

const App = () => {
  const {  status } = useQuiz();

  // const levelSecondsRemaining = secondsRemaining - numQuestions* QUESTION_SECS;



  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextBtn />
            </Footer>
          </>
        )}
        {status === "finished" && <ScoreScreen />}
      </Main>
    </div>
  );
};

export default App;
