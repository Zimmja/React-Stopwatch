const addTask = (tasksArr, updateFunction) => {
  tasksArr.push({
    description: `Task ${tasksArr.length + 1}`,
    value: 0,
    visible: true,
  });
  updateFunction({ tasks: tasksArr });
};

const deleteTask = (i, tasksArr, hiddenArr, updateFunction) => {
  console.log(tasksArr);
  tasksArr[i].visible = false;
  hiddenArr.push(tasksArr[i]);
  updateFunction({ tasks: tasksArr, hidden: hiddenArr });
};

const unhideTask = (hiddenArr, updateFunction) => {
  const unhidden = hiddenArr.pop();
  unhidden.visible = true;
  updateFunction({ hidden: hiddenArr });
};

module.exports = { addTask, deleteTask, unhideTask };
