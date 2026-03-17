import { useTodoStore } from "../store/todoStore"
import TodoItem from "./todoItem"


export const TodoList = () => {
  const todos = useTodoStore((state) => state.todos)

  const activeTodos = todos.filter((todo) => todo.isActive)

    return (
        <div>
          {activeTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )
}