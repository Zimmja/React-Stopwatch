const pauseTimer = (loopFunc, reState) => {
  clearInterval(loopFunc);
  reState({ activeLoop: null });
};

const incTimerLoop = (timeInterval, incTimerProps) =>
  setInterval(() => {
    incTimer(timeInterval, incTimerProps);
  }, timeInterval);

const incTimer = (val = 0, incProps) => {
  const tasksArr = incProps.tasks;
  const newTime = tasksArr[incProps.current].value + val;
  tasksArr[incProps.current].value = newTime;
  incProps.restateFunc({ tasks: tasksArr });
};

const stopTimer = (pause, setCurrent) => {
  pause();
  setCurrent(-1);
};

const restartTimer = (i, pause, setCurrent, start) => {
  pause();
  setCurrent(i);
  start();
};

const appTimer = {
  pauseTimer,
  incTimerLoop,
  stopTimer,
  restartTimer,
};

module.exports = appTimer;
