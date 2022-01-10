const addTask = (tasksArr, taskMax, reState) => {
  const newMax = taskMax + 1;
  tasksArr.push(newTask(`Task ${newMax}`, 0, true));
  reState({ tasks: tasksArr, taskMax: newMax });
};

const newTask = (desc, val, vis) => ({
  description: desc,
  value: val,
  visible: vis,
});

const hideTask = (i, tasksArr, hiddenArr, reState) => {
  tasksArr[i].visible = false;
  hiddenArr.push(tasksArr[i]);
  reState({ tasks: tasksArr, hidden: hiddenArr });
};

const unhideTask = (hiddenArr, reState) => {
  const unhidden = hiddenArr.pop();
  unhidden.visible = true;
  reState({ hidden: hiddenArr });
};

const resetTask = (i, tasksArr, reState) => {
  tasksArr[i].value = 0;
  reState({ tasks: tasksArr });
};

const tasksTotal = (tasksArr) => {
  const unhiddenTasks = tasksArr.filter((task) => task.visible === true);
  const taskVals = unhiddenTasks.map((task) => task.value);
  return taskVals.reduce((pre, pos) => pre + pos);
};

const deleteHiddenTasks = (tasksArr, hiddenArr, reState, currentInfo) => {
  resetCurrent(tasksArr, hiddenArr, currentInfo[0], currentInfo[1]);
  while (hiddenArr.length > 0) {
    tasksArr.splice(tasksArr.indexOf(hiddenArr[0]), 1);
    hiddenArr.shift();
  }
  reState({ tasks: tasksArr, hidden: hiddenArr });
};

const resetCurrent = (tasksArr, hiddenArr, current, setCurrent) => {
  const underCurrents = tasksArr.filter(
    (task, i) => i < current && hiddenArr.includes(task)
  );
  const newCurrent = current - underCurrents.length;
  setCurrent(newCurrent);
};

const stopTasks = (pause, setCurrent) => {
  pause();
  setCurrent(-1);
};

const appTasks = {
  addTask,
  hideTask,
  unhideTask,
  resetTask,
  tasksTotal,
  deleteHiddenTasks,
  stopTasks,
};

module.exports = appTasks;
