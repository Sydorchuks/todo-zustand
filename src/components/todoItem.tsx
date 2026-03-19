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
  const activeTab = useTodoStore((s) => s.activeTab)
  const restoreTodo = useTodoStore((s) => s.restoreTodo)
  const removeTodo = useTodoStore((s) => s.removeTodo)

  const [isEditing, setIsEditing] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [value, setValue] = useState(todo.text)

  const handleSave = () => {
    if (!value.trim()) return
    editTodo(todo.id, value)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setValue(todo.text)
    setIsEditing(false)
  }

  const handleConfirmDelete = () => {
    deleteTodo(todo.id)
    setIsConfirmOpen(false)
  }

  return (
    <div className="todo">
      <div className="todo-left">
        {isEditing ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave()
              if (e.key === "Escape") handleCancel()
            }}
          />
        ) : (
          <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
            {todo.text}
          </span>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave}>💾</button>
            <button onClick={handleCancel}>❌</button>
          </>
        ) : activeTab === "tasks" ? (
          <>
            <button onClick={() => toggleTodo(todo.id)}>✔</button>
            <button onClick={() => setIsEditing(true)}>✏</button>
            <button
              className="deleteButton"
              onClick={() => setIsConfirmOpen(true)}
            >
              🗑
            </button>
          </>
        ) : (
          <>
            <button onClick={() => restoreTodo(todo.id)}>↩</button>
            <button
              className="deleteButton"
              onClick={() => removeTodo(todo.id)}
            >
              ❌
            </button>
          </>
        )}

        {isConfirmOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <p>Are you sure you want to delete this task?</p>

              <div className="modal-actions">
                <button onClick={() => setIsConfirmOpen(false)}>
                  Cancel
                </button>

                <button
                  className="deleteButton"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoItem