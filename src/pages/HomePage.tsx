import { useNavigate } from "react-router-dom"
import { useTodoStore } from "../store/todoStore"

export default function HomePage() {
  const addGroup = useTodoStore((s) => s.addGroup)
  const navigate = useNavigate()

  const handleCreate = () => {
    const id = addGroup()
    navigate(`/groups/${id}`)
  }

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