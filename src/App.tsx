import { useMemo } from "react"
import TodoInput from "./components/todoInput"
import { TodoList } from "./components/todoList"
import { useTodoStore } from "./store/todoStore"

function App() {

  const todos = useTodoStore((state) => state.todos)

  const tasksCount = useMemo(
    () => todos.filter((t) => t.isActive).length,
    [todos]
  )
  
  const trashCount = useMemo(
    () => todos.filter((t) => !t.isActive).length,
    [todos]
  )

  const activeTab = useTodoStore((s) => s.activeTab)
  const setActiveTab = useTodoStore((s) => s.setActiveTab)

  return (
    <div className="app">
      <header className="header">
        <h1>
          do<span className="dot">.</span>it
        </h1>
      </header>
  
      <button
        className={`tab ${activeTab === "tasks" ? "active" : ""}`}
        onClick={() => setActiveTab("tasks")}
      >
        Tasks <span className="badge">{tasksCount}</span>
      </button>

      <button
        className={`tab ${activeTab === "trash" ? "active" : ""}`}
        onClick={() => setActiveTab("trash")}
      >
        Trash <span className="badge">{trashCount}</span>
      </button>
  
      <TodoInput />
  
      <h3 className="section-title">YOUR TASKS</h3>
  
      <TodoList />
    </div>
  )
}

export default App