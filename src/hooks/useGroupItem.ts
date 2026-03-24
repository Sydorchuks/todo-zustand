import { useEffect, useRef, useState } from "react"
import { useTodoStore } from "../store/todoStore"
import type { Group } from "../types/group"

export const useGroupItem = (group: Group) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
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