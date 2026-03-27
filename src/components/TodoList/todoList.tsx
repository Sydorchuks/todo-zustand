import type { Todo } from "../../types/todo"
import TodoItem from "../TodoItem/todoItem"
import "./todoList.css"


type Props = {
  items: Todo[]
  emptyText: string
}

const TodoList = ({ items, emptyText }: Props) => {
  if (items.length === 0) {
    return (
      <div className="empty">
        <div className="empty-icon">✓</div>
        <p>{emptyText}</p>
      </div>
    )
  }

  return (
    <div className="todo-list">
      {items.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodoList