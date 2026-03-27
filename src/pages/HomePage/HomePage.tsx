import { useNavigate } from "react-router-dom"
import { useTodoStore } from "../../store/todoStore"
import "./HomePage.css"

export default function HomePage() {
  const addGroup = useTodoStore((s) => s.addGroup)
  const groups = useTodoStore((s) => s.groups)
  const navigate = useNavigate()

  const handleCreate = () => {
    const id = addGroup()
    navigate(`/groups/${id}`)
  }

  if (groups.length === 0) {
    return (
      <div className="home">
        <h1 className="home-title">
          Create your first group
        </h1>

        <p className="home-subtitle">
          Start organizing your tasks right now
        </p>

        <button className="home-btn" onClick={handleCreate}>
          Create Group
        </button>
      </div>
    )
  }

  return (
    <div className="home">
      <h1 className="home-title">Your groups</h1>

      <div className="groups-grid">
        {groups.map((g) => (
          <div
            key={g.id}
            className="group-card"
            onClick={() => navigate(`/groups/${g.id}`)}
          >
            {g.title}
          </div>
        ))}

        <div className="group-card add-card" onClick={handleCreate}>
          + Add Group
        </div>
      </div>
    </div>
  )
}
