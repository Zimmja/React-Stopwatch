const addTask = (tasksArr, updateFunction) => {
  tasksArr.push({
    description: `Task ${tasksArr.length + 1}`,
    value: 0,
    visible: true,
  });
  updateFunction({ tasks: tasksArr });
};

const deleteTask = (i, tasksArr, hiddenArr, updateFunction) => {
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
  const taskVals = tasksArr.map((task) => task.value);
  return taskVals.reduce((pre, pos) => pre + pos);
};

module.exports = { addTask, deleteTask, unhideTask, resetTask, tasksTotal };
