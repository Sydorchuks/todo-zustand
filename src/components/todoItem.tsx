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
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />

      {isEditing ? (
        <>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </>
      )}
    </div>
  )
}

export default TodoItem