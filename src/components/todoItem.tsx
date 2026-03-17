import { useTodoStore } from "../store/todoStore"
import type { Todo } from "../types/todo"

type Props = {
  todo: Todo
}

const TodoItem = ({ todo }: Props) => {
  const toggleTodo = useTodoStore((state) => state.toggleTodo)

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />

      <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}> {todo.text} </span>

    </div>
  )
}

export default TodoItem