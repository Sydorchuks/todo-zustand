import { useTodoStore } from "../store/todoStore"

export const useAddTodo = () => {
  const addTodo = useTodoStore((state) => state.addTodo)

  return (value: string, clear: () => void) => {
    if (!value.trim()) return

    const words = value.trim().split(/\s+/)

    if (words.length > 20) {
      alert("20 word max")
      return
    }

    addTodo(value)
    clear()
  }
}