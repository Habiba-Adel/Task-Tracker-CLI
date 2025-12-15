# 📝 Task Tracker CLI

A simple yet powerful **Command-Line Interface (CLI)** tool to manage your daily tasks. Add to-dos, track progress, mark tasks as completed, and list them by status — all with persistent local storage in a JSON file.

Built with **vanilla JavaScript** (no external dependencies).

---

## 🌟 Features

- ✅ Add, update, and delete tasks  
- ⏳ Mark tasks as **in-progress**  
- ✅ Mark tasks as **done**  
- 📋 List all tasks or filter by status (`todo`, `in-progress`, `done`)  
- 💾 Data persisted in `tasks-data.json`  
- ⚡ Lightweight and fast — pure Node.js  

---

## 🚀 Installation

```bash
git clone https://github.com/Habiba-Adel/Task-Tracker-CLI.git
cd Task-Tracker-CLI
node app.js
```

## 💻 Usage
After running node app.js, you'll enter the interactive CLI with the prompt:
``` bash
texthabiba-task-cli$
```

## 🛠️ Available Commands

| Command                        | Description                           |
|--------------------------------|---------------------------------------|
| `add "Task Name"`               | Add a new task                        |
| `update <id> "New Name"`        | Update an existing task's name        |
| `delete <id>`                   | Delete a task                         |
| `mark-in-progress <id>`         | Mark a task as in-progress            |
| `mark-done <id>`                | Mark a task as done                    |
| `list`                          | List all tasks                         |
| `list todo`                     | List pending tasks                     |
| `list in-progress`              | List tasks in progress                 |
| `list done`                     | List completed tasks                   |
| `help`                          | Show available commands                |
| `exit`                          | Exit the CLI                           |


## Example 
``` bash
habiba-task-cli$ add "Finish Node.js project"
Task added successfully (ID: 1)

habiba-task-cli$ mark-in-progress 1
Task ID 1 marked as in-progress

habiba-task-cli$ list
ID: 1 | Status: in-progress | Finish Node.js project | Created: 15 Dec 2025, 22:34 | Updated: 15 Dec 2025, 22:34
```

## 📁 File Structure
``` text
Task-Tracker-CLI/
│
├─ app.js          # Main CLI application
├─ tasks-data.json # Stores all tasks (created automatically)
└─ README.md       # This file
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check the issues page or submit a pull request.
Suggestions for new features are highly appreciated!

## Made by me Habiba Adel ❤️ 
