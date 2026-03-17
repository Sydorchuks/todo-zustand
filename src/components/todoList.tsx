import { useTodoStore } from "../store/todoStore"
import TodoItem from "./todoItem"


export const TodoList = () => {
    const todos = useTodoStore((state) => state.todos)

    return (
        <div>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )
}