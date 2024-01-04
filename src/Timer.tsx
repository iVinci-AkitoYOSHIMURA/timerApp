import { useEffect, useState } from "react";
// import useSound from "use-sound";
// import Sound from "";
import SetTime from "./components/SetTime";
import { Button, Text } from "@chakra-ui/react";
import ResetButton from "./components/ResetButton";
import RemainingTime from "./components/RemainingTime";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [timerSet, setTimerSet] = useState(false);
  // const [play] = useSound(Sound);

  const handleRestartTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      setCurrentTime(time); // タイマーを停止した時点の時間で固定する
    } else {
      setIsRunning(true);
      setTime(currentTime); // タイマーを再開する時は保持していた時間を使う
    }
  };

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
        <Button
          colorScheme="blue"
          margin="10"
          w={40}
          onClick={handleRestartTimer}
        >
          {isRunning ? "ストップ" : "再開"}
        </Button>
        <ResetButton onReset={reset}>リセット</ResetButton>
      </div>
    </>
  );
};

export default Timer;
