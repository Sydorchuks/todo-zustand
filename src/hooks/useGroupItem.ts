import { useEffect, useRef, useState } from "react"
import { useTodoStore } from "../store/todoStore"

export const useGroupItem = (group) => {
  const updateGroup = useTodoStore((s) => s.updateGroup)
  const deleteGroup = useTodoStore((s) => s.deleteGroup)

  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(group.title)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const handleSave = () => {
    if (!value.trim()) return
    updateGroup(group.id, value)
    setIsEditing(false)
  }

  const handleDelete = () => {
    setIsConfirmOpen(true)
    setIsMenuOpen(false)
  }

  const handleConfirmDelete = () => {
    deleteGroup(group.id)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return {
    isEditing,
    value,
    setValue,
    setIsEditing,
    isMenuOpen,
    setIsMenuOpen,
    isConfirmOpen,
    setIsConfirmOpen,
    handleSave,
    handleDelete,
    handleConfirmDelete,
    handleKeyDown,
    ref
  }
}