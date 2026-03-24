import { NavLink } from "react-router-dom"
import { useGroupItem } from "../hooks/useGroupItem"
import type { Group } from "../types/group"

type Props = {
  group: Group
}

const SidebarItem = ({ group }: Props) => {
  const {
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
  } = useGroupItem(group)


  return (
    <div className="sidebar-row" ref={ref}>

      {isEditing ? (
        <input
          className="sidebar-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <NavLink
          to={`/groups/${group.id}`}
          className="sidebar-item"
        >
          {group.title}
        </NavLink>
      )}

      <button
        className="menu-btn"
        onClick={() => setIsMenuOpen((v) => !v)}
      >
        ⋯
      </button>

      {isMenuOpen && (
        <div className="dropdown">
          <button onClick={() => {
            setIsEditing(true)
            setIsMenuOpen(false)
          }}>
            Rename
          </button>

          <button onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}

      {isConfirmOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Delete this group?</p>

            <div className="modal-actions">
              <button onClick={() => setIsConfirmOpen(false)}>
                Cancel
              </button>

              <button
                className="deleteButton"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default SidebarItem