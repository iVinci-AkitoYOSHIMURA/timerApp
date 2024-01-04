import { useEffect, useState } from "react";
// import useSound from "use-sound";
// import Sound from "";
import SetTime from "./components/SetTime";
import { Text } from "@chakra-ui/react";
import ResetButton from "./components/ResetButton";
import RemainingTime from "./components/RemainingTime";
import Toggle from "./components/Toggle";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [timerSet, setTimerSet] = useState(false);
  // const [play] = useSound(Sound);

  const reset = () => {
    setTime(0);
    setCurrentTime(0);
    setIsRunning(false);
    setTimerSet(false);
  };
  const resetAll = () => {
    reset();
    setMinutes(0);
    setSeconds(0);
  };

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = window.setInterval(() => {
        setTime((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            // play();
            clearInterval(intervalId);
            setIsRunning(false);
            setTimerSet(false);
            return prev;
          }
        });
      }, 1000);
    }

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isRunning]);

  return (
    <>
      <SetTime
        minutes={minutes}
        seconds={seconds}
        timerSet={timerSet}
        setMinutes={setMinutes}
        setSeconds={setSeconds}
        setTime={setTime}
        setErrorMessage={setErrorMessage}
        setIsRunning={setIsRunning}
        setTimerSet={setTimerSet}
      />
      <ResetButton onReset={resetAll}>Allリセット</ResetButton>
      {errorMessage && (
        <Text color={"red"} fontSize={20}>
          {errorMessage}
        </Text>
      )}
      <RemainingTime time={time} />
      <div>
        <Toggle
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          time={time}
          setTime={setTime}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
        />
        <ResetButton onReset={reset}>リセット</ResetButton>
      </div>
    </>
  );
};

export default Timer;
