import { useRef, useState } from "react"
import { useTodoStore } from "../store/todoStore"
import type { Group } from "../types/group"
import { useLocation, useNavigate } from "react-router-dom"
import { useClickOutside } from "./useClickOutside"

export const useGroupItem = (group: Group) => {
  const updateGroup = useTodoStore((s) => s.updateGroup)
  const deleteGroup = useTodoStore((s) => s.deleteGroup)
  const navigate = useNavigate()
  const location = useLocation()

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
    const isActivePage = location.pathname === `/groups/${group.id}`

    deleteGroup(group.id)

    if (isActivePage) {
      navigate("/")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const ref = useRef<HTMLDivElement | null>(null)

  useClickOutside({
    ref,
    handler: () => setIsMenuOpen(false)
  })

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