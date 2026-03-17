import { useTodoStore } from "../store/todoStore"
import TodoItem from "./todoItem"


export const TodoList = () => {
  const todos = useTodoStore((state) => state.todos)

  const activeTodos = todos.filter((todo) => todo.isActive)

  return (
    <div className="todo-list">
      {activeTodos.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">✓</div>
          <p>Nothing here yet — add your first task!</p>
        </div>
      ) : (
        activeTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))
      )}
    </div>
  )
}