import { useState } from "react"
import { useTodoStore } from "../store/todoStore"
import type { Todo } from "../types/todo"

export const useTodoItem = (todo: Todo) => {
  const toggleTodo = useTodoStore((s) => s.toggleTodo)
  const editTodo = useTodoStore((s) => s.editTodo)
  const deleteTodo = useTodoStore((s) => s.deleteTodo)
  const restoreTodo = useTodoStore((s) => s.restoreTodo)
  const removeTodo = useTodoStore((s) => s.removeTodo)

  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(todo.text)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const handleSave = () => {
    if (!value.trim()) return
    editTodo(todo.id, value)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setValue(todo.text)
    setIsEditing(false)
  }

  const handleDelete = () => {
    setIsConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    deleteTodo(todo.id)
    setIsConfirmOpen(false)
  }

  return {
    isEditing,
    value,
    isConfirmOpen,

    setValue,
    setIsEditing,
    setIsConfirmOpen,

    handleSave,
    handleCancel,
    handleDelete,
    handleConfirmDelete,

    toggleTodo,
    restoreTodo,
    removeTodo
  }
}