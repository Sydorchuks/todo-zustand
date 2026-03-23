import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTodoStore } from "../store/todoStore"

export default function HomePage() {
  const [text, setText] = useState("")

  const addGroup = useTodoStore((s) => s.addGroup)
  const addTodo = useTodoStore((s) => s.addTodo)

  const navigate = useNavigate()

  const handleAdd = () => {
    if (!text.trim()) return

    const groupId = addGroup()
    addTodo(text, groupId)

    navigate(`/groups/${groupId}`)
  }

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}