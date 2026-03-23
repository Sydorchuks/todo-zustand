import TodoInput from "./components/todoInput"
import TodoList from "./components/todoList"

import { useTodoStore } from "./store/todoStore"

function App() {

  const todos = useTodoStore((s) => s.todos)

  const activeItems = todos.filter((t) => t.isActive)
  const trashItems = todos.filter((t) => !t.isActive)

  const activeTab = useTodoStore((s) => s.activeTab)
  const setActiveTab = useTodoStore((s) => s.setActiveTab) 

  const isTasks = activeTab === "tasks"

  return (
    <div className="app">
      <header className="header">
        <h1>
          do<span className="dot">.</span>it
        </h1>
      </header>

      <button className={`tab ${activeTab === "trash" ? "tasks" : ""}`}
        onClick={() => setActiveTab("tasks")}>
        Tasks <span className="badge">{activeItems.length}</span>
      </button>

      <button className={`tab ${activeTab === "trash" ? "tasks" : ""}`}
        onClick={() => setActiveTab("trash")}>
        Trash <span className="badge">{trashItems.length}</span>
      </button>

      <TodoInput />
  
      <h3 className="section-title">
        {isTasks ? "YOUR TASKS" : "TRASH"}
      </h3>

      <TodoList
        items={isTasks ? activeItems : trashItems}
        emptyText={
          isTasks
            ? "Nothing here yet — add your first task!"
            : "Trash is empty"
        }
      />

    </div>
  )
}

export default App