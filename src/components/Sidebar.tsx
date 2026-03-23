import { NavLink, useNavigate } from "react-router-dom"
import { useTodoStore } from "../store/todoStore"

const Sidebar = () => {
  const groups = useTodoStore((s) => s.groups)
  const addGroup = useTodoStore((s) => s.addGroup)
  const navigate = useNavigate()

  const handleCreate = () => {
    const id = addGroup()
    navigate(`/groups/${id}`)
  }

  return (

    <aside className="sidebar">
        <div className="sidebar-header">
            <h1>
            do<span className="dot">.</span>it
            </h1>
        </div>
      <button className="sidebar-btn" onClick={handleCreate}>
        + New Group
      </button>

      <div className="sidebar-title">Your groups</div>

      <div className="sidebar-list">
        {groups.map((g) => (
          <NavLink
            key={g.id}
            to={`/groups/${g.id}`}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            {g.title}
          </NavLink>
        ))}

        {groups.length === 0 && (
          <div className="sidebar-empty">No groups yet</div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar