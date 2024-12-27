const getDate = () => {
  const currentDate = new Date();
  return currentDate.toLocaleDateString();
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
const createTask = function (userName, task, table) {
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

const fetchTasks = function (userName) {
  return displayDataOf(userName, userName.tasks);
};

//update task by user name
//creation date and id shouldn't changed
const updateTasksOf = function (userName, taskID, field, content) {
  userName.tasks[taskID - 1][field] = content;
  return displayDataOf(userName, userName.tasks);
};

//delete tasks
const deleteTasksOf = function (userName, taskID) {
  user.tasks.splice(taskID - 1, 1);
  return displayDataOf(userName, userName.tasks);
};

//sort by priority
//need to sort by multiple fields
const getPriorityValuesOf = function (priority) {
  const lookUp = { high: 1, medium: 2, low: 3 };
  return lookUp[priority.toLowerCase()];
};

const sortBy = function (userName) {
  const sorted = user.tasks.sort((taskA, taskB) => {
    const taskAPriority = getPriorityValuesOf(taskA.priority);
    const taskBPriority = getPriorityValuesOf(taskB.priority);

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

const promptTocreateTasksOf = (userName, table) => {
  const title = prompt("enter task title");
  const description = prompt("enter task description");
  const dueDate = prompt("enter due date");
  const priority = prompt("enter priority");

  return createTask(userName, { title, description, dueDate, priority }, table);
};

const promptToUpdateTasksOf = (userName, table) => {
  const taskID = +prompt("enter task ID");
  const taskField = prompt("enter task field");
  const updatedValue = prompt("enter content to update");

  return updateTasksOf(userName, taskID, taskField, updatedValue, table);
};

const promptToDeleteTasksOf = (userName, table) => {
  const taskID = prompt("enter task ID");
  return deleteTasksOf(userName, taskID, table);
};

const executeCommand = (command, operations, userName, table) => {
  if (!operations[command]) {
    console.log("command not found:", command);
    return;
  }

  return operations[command](userName, table);
};

const main = () => {
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

  while (true) {
    const command = prompt(
      "\nselect an operation:  registration\tcreateTODO\tfetch\tupdate\tdelete\t sortBy\t\t\tlogin\t\tsignup\n"
    );

    const operations = {
      registration: registerUser,
      fetch: fetchTasks,
      sortBy,

      createTODO: promptTocreateTasksOf,
      update: promptToUpdateTasksOf,
      delete: promptToDeleteTasksOf,
    };

    const userName = getUserDetails();
    executeCommand(command, operations, userName, table);
  }
};

main();
