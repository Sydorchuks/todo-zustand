import { useTodoStore } from "../store/todoStore"
import TodoItem from "./todoItem"


export const TodoList = () => {
  const todos = useTodoStore((state) => state.todos)

  const activeTab = useTodoStore((s) => s.activeTab)

  const filteredTodos =
    activeTab === "tasks"
      ? todos.filter((t) => t.isActive)
      : todos.filter((t) => !t.isActive)

      return (
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">✓</div>
              <p>
                {activeTab === "tasks"
                  ? "Nothing here yet — add your first task!"
                  : "Trash is empty"}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          )}
        </div>
      )
}