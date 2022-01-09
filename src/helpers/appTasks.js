const addTask = (tasksArr, taskMax, updateFunction) => {
  const newMax = taskMax + 1;
  tasksArr.push({
    description: `Task ${newMax}`,
    value: 0,
    visible: true,
  });
  updateFunction({ tasks: tasksArr, taskMax: newMax });
};

const hideTask = (i, tasksArr, hiddenArr, updateFunction) => {
  tasksArr[i].visible = false;
  hiddenArr.push(tasksArr[i]);
  updateFunction({ tasks: tasksArr, hidden: hiddenArr });
};

const unhideTask = (hiddenArr, updateFunction) => {
  const unhidden = hiddenArr.pop();
  unhidden.visible = true;
  updateFunction({ hidden: hiddenArr });
};

const resetTask = (i, tasksArr, updateFunction) => {
  tasksArr[i].value = 0;
  updateFunction({ tasks: tasksArr });
};

const tasksTotal = (tasksArr) => {
  const unhiddenTasks = tasksArr.filter((task) => task.visible === true);
  const taskVals = unhiddenTasks.map((task) => task.value);
  return taskVals.reduce((pre, pos) => pre + pos);
};

const deleteHiddenTasks = (tasksArr, hiddenArr, updateFunction) => {
  // console.log("BEFORE:");
  // console.log(tasksArr.map((task) => task.description));
  // console.log(hiddenArr.map((task) => task.description));
  while (hiddenArr.length > 0) {
    tasksArr.splice(tasksArr.indexOf(hiddenArr[0]), 1);
    hiddenArr.shift();
  }
  // console.log("AFTER:");
  // console.log(tasksArr.map((task) => task.description));
  // console.log(hiddenArr.map((task) => task.description));
  updateFunction({ tasks: tasksArr, hidden: hiddenArr });
};

const appTasks = {
  addTask,
  hideTask,
  unhideTask,
  resetTask,
  tasksTotal,
  deleteHiddenTasks,
};

module.exports = appTasks;
