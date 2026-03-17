import { useState } from "react"
import { useTodoStore } from "../store/todoStore"

const TodoInput = () => {
  const [value, setValue] = useState("")
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleAdd = () => {
    if (!value.trim()) return

    addTodo(value)
    setValue("")
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Add todo..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd()
          }
        }}
      />

      <button onClick={handleAdd}>Add</button>
    </div>
  )
}

export default TodoInput