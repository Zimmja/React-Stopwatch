const pauseTimer = (loopFunc, reState) => {
  clearInterval(loopFunc);
  reState({ activeLoop: null });
};

const incTimerLoop = (incFunc, timeInterval) =>
  setInterval(() => {
    incFunc(timeInterval);
  }, timeInterval);

const incTimer = (val = 0, tasksArr, currentTask, reState) => {
  const newTime = tasksArr[currentTask].value + val;
  tasksArr[currentTask].value = newTime;
  reState({ tasks: tasksArr });
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
  incTimer,
  stopTimer,
  restartTimer,
};

module.exports = appTimer;
