import { useState } from "react"
import { useAddTodo } from "../hooks/addTodo"

type Props = {
  groupId?: string
}

const TodoInput = ({ groupId }: Props) => {
  const [value, setValue] = useState("")
  const handleAdd = useAddTodo(groupId)

  return (
    <form
      className="input-row"
      onSubmit={(e) => {
        e.preventDefault()
        handleAdd(value, () => setValue(""))
      }}
    >
      <input
        type="text"
        placeholder="Add a new task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default TodoInput