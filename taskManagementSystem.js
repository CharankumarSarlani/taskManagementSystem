const table = [
  {
    id: 1,
    userName: "charan",
    tasks: [
      {
        id: 1,
        title: "practice js",
        description: "closures, object methods",
        creationDate: "25/12/2024",
        dueDate: "25/12/2024",
        status: "pending",
        priority: "high",
      },
    ],
  },
];

const getDate = () => {
  const currentDate = new Date();
  const date = [
    currentDate.getDate(),
    currentDate.getMonth() + 1,
    currentDate.getFullYear(),
  ];

  return date.join("/");
};

const userNotFoundException = (userName) => {
  console.log("user not found:", userName);
  main();
};

//user registeration
const registerUser = function () {
  table.push({ id: table.length + 1, userName: getUserName(), tasks: [] });
};

//find user details
const fetchUser = (userName) =>
  table.find((person) => person.userName === userName);

//create task
const createTask = function (userName, task) {
  const user = fetchUser(userName);

  if (!user) return userNotFoundException(userName);

  const index = user.id - 1;
  const { title, description, dueDate, priority } = task;
  const data = {
    id: table[index].tasks.length + 1,
    title,
    description,
    creationDate: getDate(),
    dueDate,
    status: "pending",
    priority,
  };

  table[index].tasks.push(data);
};

//fetch task by user name
const displayDataOf = function (userName, data) {
  console.log(userName);
  console.table(data);
};

const fetchTasksOf = function () {
  const userName = getUserName();
  const user = fetchUser(userName);
  if (!user) return userNotFoundException(userName);

  return displayDataOf(userName, user.tasks);
};

//update task by user name
//creation date and id shouldn't changed
const updateTasksOf = function (userName, taskID, field, content) {
  const user = fetchUser(userName);
  if (!user) return userNotFoundException(userName);

  user.tasks[taskID - 1][field] = content;
  return displayDataOf(userName, user.tasks);
};

//delete tasks
const deleteTasksOf = function (userName, taskID) {
  const user = fetchUser(userName);
  if (!user) return userNotFoundException(userName);

  user.tasks.splice(taskID - 1, 1);
  return displayDataOf(userName, user.tasks);
};

//sort by priority
//need to sort by multiple fields
const getLookUp = function (field) {
  const lookUp = { high: 1, medium: 2, low: 3 };
  return lookUp[field.toLowerCase()];
};

const sortBy = function (fieldToSort) {
  const userName = getUserName();
  const user = fetchUser(userName);

  if (!user) return userNotFoundException(userName);

  const sorted = user.tasks.sort((taskA, taskB) => {
    const taskAPriority = getLookUp(taskA.priority);
    const taskBPriority = getLookUp(taskB.priority);

    return taskAPriority - taskBPriority;
  });

  return displayDataOf(userName, sorted);
};

const getUserName = () => {
  return prompt("enter user name : ");
};

const getUserDetails = () => {
  const userName = getUserName();
  const user = fetchUser(userName);

  if (!user) return userNotFoundException(userName);
  return userName;
};

const promptTocreateTask = () => {
  const userName = getUserDetails();
  const title = prompt("enter task title");
  const description = prompt("enter task description");
  const dueDate = prompt("enter due date");
  const priority = prompt("enter priority");

  return createTask(userName, { title, description, dueDate, priority });
};

const promptToUpdateTasksOf = () => {
  const userName = getUserDetails();
  const taskID = +prompt("enter task ID");
  const taskField = prompt("enter task field");
  const updatedValue = prompt("enter content to update");

  return updateTasksOf(userName, taskID, taskField, updatedValue);
};

const promptToDeleteTasksOf = () => {
  const userName = getUserDetails();
  const taskID = prompt("enter task ID");
  return deleteTasksOf(userName, taskID);
};

const executeCommand = (command, operations) => {
  if (!operations[command]) {
    console.log("command not found:", command);
    return;
  }
  return operations[command]();
};

const main = () => {
  while (true) {
    const command = prompt(
      "select an operation:  registration createTODO fetch update delete sortBy\n"
    );

    const operations = {
      registration: registerUser,
      fetch: fetchTasksOf,
      sortBy: sortBy,

      createTODO: promptTocreateTask,
      update: promptToUpdateTasksOf,
      delete: promptToDeleteTasksOf,
    };

    executeCommand(command, operations);
  }
};

main();
// registerUser("Bobby");

// createTask("charan", {
//   title: "demo",
//   description: "demo",
//   dueDate: 0,
//   priority: "medium",
// });

// createTask("charan", {
//   title: "demo2",
//   description: "demo",
//   dueDate: 0,
//   priority: "high",
// });

// fetchTasksOf("charan");
// updateTasksOf("charan", 1, "title", "modified value");
// // deleteTasksOf("charan", 2);
// sortBy("charan");
