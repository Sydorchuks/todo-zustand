import { useState } from "react"
import { useTodoStore } from "../store/todoStore"
import type { Todo } from "../types/todo"

type Props = {
  todo: Todo
}

const TodoItem = ({ todo }: Props) => {
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  const editTodo = useTodoStore((state) => state.editTodo)
  const deleteTodo = useTodoStore((state) => state.deleteTodo)

  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(todo.text)

  const handleSave = () => {
    if (!value.trim()) return

    editTodo(todo.id, value)
    setIsEditing(false)
  }
  
  return (
    <div className="todo">
      <div className="todo-left">
        {isEditing ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
            {todo.text}
          </span>
        )}
      </div>
  
      <div className="todo-actions">
        {isEditing ? (
          <button onClick={handleSave}>✔</button>
        ) : (
          <>
            {todo.completed! ? (<button onClick={() => toggleTodo(todo.id)}>✗</button>) : (<button onClick={() => toggleTodo(todo.id)}>✔</button>)}
            <button onClick={() => setIsEditing(true)}>✏</button>
            <button onClick={() => deleteTodo(todo.id)} className="deleteButton">🗑</button>
          </>
        )}
      </div>
    </div>
  )
}

export default TodoItem