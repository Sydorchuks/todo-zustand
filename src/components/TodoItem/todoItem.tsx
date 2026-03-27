import { useTodoItem } from "../../hooks/useTodoItem";
import type { Todo } from "../../types/todo";
import "./TodoItem.css"

type Props = {
  todo: Todo
}

const TodoItem = ({ todo }: Props) => {
  const {
    isEditing,
    value,
    isConfirmOpen,
    setValue,
    setIsEditing,
    setIsConfirmOpen,
    handleSave,
    handleCancel,
    handleDelete,
    handleConfirmDelete,
    toggleTodo,
    restoreTodo,
    removeTodo
  } = useTodoItem(todo);

  return (
    <div className="todo">
      <div className="todo-left">
        {isEditing ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <span className={`todo-text ${todo.completed ? "completed" : ""}`}>{todo.text}</span>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave}>💾</button>
            <button onClick={handleCancel}>❌</button>
          </>
        ) : todo.isActive ? (
          <>
            <button onClick={() => toggleTodo(todo.id)}>✔</button>
            <button onClick={() => setIsEditing(true)}>✏</button>
            <button onClick={handleDelete} className="deleteButton">🗑</button>
          </>
        ) : (
          <>
            <button onClick={() => restoreTodo(todo.id)}>↩</button>
            <button onClick={() => removeTodo(todo.id)}>❌</button>
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