import { useTodoStore } from "../store/todoStore"
import { useNavigate } from "react-router-dom"

export const useAddTodo = (groupId?: string) => {
  const addTodo = useTodoStore((state) => state.addTodo)
  const addGroup = useTodoStore((state) => state.addGroup)

  const navigate = useNavigate()

  return (value: string, clear: () => void) => {
    if (!value.trim()) return

    const words = value.trim().split(/\s+/)

    if (words.length > 20) {
      alert("20 word max")
      return
    }

    let id = groupId
    
    if (!id) {
      id = addGroup()
      navigate(`/groups/${id}`)
    }

    addTodo(value, id)
    clear()
  }
}