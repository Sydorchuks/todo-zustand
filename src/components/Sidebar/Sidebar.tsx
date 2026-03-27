import { useNavigate } from "react-router-dom"
import { useTodoStore } from "../../store/todoStore"
import SidebarItem from "../SidebarItem/SidebarItem"
import "./Sidebar.css"


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
        <h2>
          do<span className="dot">.</span>it
        </h2>
      </div>

      <button className="sidebar-btn" onClick={handleCreate}>
        + New Group
      </button>

      <div className="sidebar-title">Your groups</div>

      <div className="sidebar-list">
        {groups.length === 0 ? (
          <div className="sidebar-empty">No groups yet</div>
        ) : groups.map(group => (
        <SidebarItem key={group.id} group={group} />
      ))}
      </div>
    </aside>
  )
}

export default Sidebar