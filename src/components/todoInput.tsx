import { useState } from "react"
import { useTodoStore } from "../store/todoStore"

const TodoInput = () => {
  const [value, setValue] = useState("")
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleAdd = () => {
    if (!value.trim()) return
    const words = value.trim().split(/\s+/)

    if (words.length > 20) {
      alert("20 word max")
      setValue("")
      return
    }
  
    addTodo(value)
    setValue("")
  }

  return (
    <div className="input-row">
      <input
        type="text"
        placeholder="Add a new task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd()
        }}
      />
  
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}

export default TodoInput