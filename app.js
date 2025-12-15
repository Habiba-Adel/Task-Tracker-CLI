const fs = require("fs");
const path = "./tasks-data.json";

// Ensure the JSON file exists
if (!fs.existsSync(path)) {
  fs.writeFileSync(path, "[]"); // start with empty array
}

// Read existing tasks and they are storing in the memory and each change happened to them will happened in the memory too which will make things consistent 
let tasks = JSON.parse(fs.readFileSync(path, "utf-8"));//the utf-8 to return the data in string not in raw data 

// Get the last used ID
let currentID=0;
if(tasks.length>0){
//the tasks now is in type json documents and i just want their ids so i will make mapping for each one to its id only
let allIDS=tasks.map(task=>task.id);
currentID=Math.max(...allIDS);
}

// Function to show prompt
function showPrompt() {
  process.stdout.write("habiba-task-cli$ ");
}

function tasksDisplayHelper(filteredTasks){
  if (filteredTasks.length === 0) {
    console.log("No tasks found.");
  } else {
    console.log("\nTodo Tasks:");
    filteredTasks.forEach(t => {
      const created = new Date(t.createdAt).toLocaleString();
      const updated = new Date(t.updatedAt).toLocaleString();
      console.log(`ID: ${t.id} | Status: ${t.status}| ${t.description} | Created: ${created} | Updated: ${updated}`);
    });
  }
}

// Introduction
console.log("Welcome to our Task Tracker CLI!");
console.log("Type 'help' to see available commands, or 'exit' to quit.\n");

// Show initial prompt
showPrompt();

// Listen for user input
process.stdin.on("data", (input) => {
  const commandLine = input.toString().trim();
  const parts = commandLine.split(" ");
  const command = parts[0].toLowerCase();

  // ---------------- HELP COMMAND ----------------
  if (command === "help") {
    console.log("\nAvailable commands:");
    console.log(' add "task name"           → Add a new task');
    console.log(' update <id> "new name"    → Update task name');
    console.log(' delete <id>               → Delete a task');
    console.log(' mark-in-progress <id>     → Mark task as in progress');
    console.log(' mark-done <id>            → Mark task as done');
    console.log(' list                      → List all tasks');
    console.log(' list done                 → List completed tasks');
    console.log(' list todo                 → List pending tasks');
    console.log(' list in-progress          → List tasks in progress');
    console.log(' exit                      → Quit CLI\n');
  } 

  // ---------------- EXIT COMMAND ----------------
  else if (command === "exit") {
    console.log("Goodbye 👋");
    process.exit(0);
  } 

  // ---------------- ADD COMMAND ----------------
  else if (command === "add") {
    let taskDescription = parts.slice(1).join(" ").trim(); // extracting all parts items starting from index 2 and that by using slice and then join all togather

    // remove the quotes if existed
    if (taskDescription.startsWith('"') && taskDescription.endsWith('"')) {
      taskDescription = taskDescription.slice(1, -1);
    }

    if (!taskDescription) {
      console.log("Please provide a task description.");
    } else {
      currentID++;
      const newTask = {
        id: currentID,
        description: taskDescription,
        status: "todo",
        createdAt: new Date(),
        updatedAt: new Date()
      };
      tasks.push(newTask);
      fs.writeFileSync(path, JSON.stringify(tasks));
      console.log(`Task added successfully (ID: ${currentID})`);//this `` is used to allow using the variables injection
    }
  }

  // ---------------- UPDATE COMMAND ----------------
  else if (command === "update") {
    const id = parseInt(parts[1]);
    let newDescription = parts.slice(2).join(" ").trim(); // extracting all parts items starting from index 2 and that by using slice and then join all togather

    // remove the quotes if existed
    if (newDescription.startsWith('"') && newDescription.endsWith('"')) {
      newDescription = newDescription.slice(1, -1);
    }

    //first i need to check that this task is already existed first 
    const task = tasks.find(t => t.id === id);
    if (!task) {
      console.log(`Task with ID ${id} not found.`);
    } else if (!newDescription) {
      console.log("Please provide a new task description.");
    } else {
      task.description = newDescription;
      task.updatedAt = new Date();
      fs.writeFileSync(path, JSON.stringify(tasks));
      console.log(`Task ID ${id} updated successfully.`);
    }
  }

  // ---------------- DELETE COMMAND ----------------
  else if (command === "delete") {
    const id = parseInt(parts[1]);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
      console.log(`Task with ID ${id} not found.`);
    } else {
      tasks.splice(index, 1);//splice is uing to add or remove items from the array using the index
      fs.writeFileSync(path, JSON.stringify(tasks));//return the json format to string to write it again in the file
      console.log(`Task ID ${id} deleted successfully.`);
    }
  }

  // ---------------- MARK-IN-PROGRESS ----------------
  else if (command === "mark-in-progress") {
    //jsut need to change the state of the given task id 
    const id = parseInt(parts[1]);
    const task = tasks.find(t => t.id === id);
    if (!task) {
      console.log(`Task with ID ${id} not found.`);
    } else {
      task.status = "in-progress";
      task.updatedAt = new Date();
      fs.writeFileSync(path, JSON.stringify(tasks));
      console.log(`Task ID ${id} marked as in-progress.`);
    }
  }

  // ---------------- MARK-DONE ----------------
  else if (command === "mark-done") {
    const id = parseInt(parts[1]);
    const task = tasks.find(t => t.id === id);
    if (!task) {
      console.log(`Task with ID ${id} not found.`);
    } else {
      task.status = "done";
      task.updatedAt = new Date();
      fs.writeFileSync(path, JSON.stringify(tasks));
      console.log(`Task ID ${id} marked as done.`);
    }
  }

  // ---------------- LIST COMMANDS ----------------
  else if (commandLine === "list") {
  // List all tasks
  tasksDisplayHelper(tasks);
}

else if (commandLine === "list done") {
  const filteredTasks = tasks.filter(t => t.status === "done");
  tasksDisplayHelper(filteredTasks);
}

else if (commandLine === "list todo") {
  const filteredTasks = tasks.filter(t => t.status === "todo");
  tasksDisplayHelper(filteredTasks);
}

else if (commandLine === "list in-progress") {
  const filteredTasks = tasks.filter(t => t.status === "in-progress");
  tasksDisplayHelper(filteredTasks);
}

  // ---------------- UNKNOWN COMMAND ----------------
  else {
    console.log("Unknown command. Type 'help' to see available commands.");
  }

  // Show prompt again
  showPrompt();
});
