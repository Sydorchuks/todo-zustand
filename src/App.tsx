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

  return (
    <div className="app">
      <header className="header">
        <h1>
          do<span className="dot">.</span>it
        </h1>
      </header>
  
      <div className="tabs">
        <button className="tab">
          Tasks <span className="badge">{tasksCount}</span>
        </button>
  
        <button className="tab">
          Trash <span className="badge">{trashCount}</span>
        </button>
      </div>
  
      <TodoInput />
  
      <h3 className="section-title">YOUR TASKS</h3>
  
      <TodoList />
    </div>
  )
}

export default App