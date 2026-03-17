import TodoInput from "./components/todoInput"
import { TodoList } from "./components/todoList"

function App() {
  return (
    <div>
      <h1>Todo App</h1>
      <TodoInput />
      <TodoList />
    </div>
  )
}

export default App