import { Link, useParams } from "react-router-dom"
import { useTodoStore } from "../../store/todoStore"
import TodoList from "../../components/TodoList/todoList"
import TodoInput from "../../components/TodoInput/todoInput"
import "./GroupPage.css"

export default function GroupPage() {
  const { groupId } = useParams()

  const todos = useTodoStore((s) => s.todos)
  const groups = useTodoStore((s) => s.groups)
  const activeTab = useTodoStore((s) => s.activeTab)
  const setActiveTab = useTodoStore((s) => s.setActiveTab)

  const group = groups.find((g) => g.id === groupId)

  if (!group) {
      return (
        <div className="not-found">
          <h2>Group not found</h2>

          <p className="not-found-text">
            The group you are looking for doesn’t exist or was deleted.
          </p>

          <Link to="/" className="not-found-link">
            ← Back to home
          </Link>
        </div>
    )
  }

  const filteredTodos = todos.filter((t) => t.groupId === groupId)

  const activeItems = filteredTodos.filter((t) => t.isActive)
  const trashItems = filteredTodos.filter((t) => !t.isActive)

  const isTasks = activeTab === "tasks"

  return (
    <div className="page">

      <div className="header">
        <h2>
          do<span className="dot">.</span>it
        </h2>
      </div>

      <span className="group-title">{group.title}</span>

      <div className="tabs">
        <button
          className={`tab ${isTasks ? "active" : ""}`}
          onClick={() => setActiveTab("tasks")}
        >
          Tasks <span className="badge">{activeItems.length}</span>
        </button>

        <button
          className={`tab ${!isTasks ? "active" : ""}`}
          onClick={() => setActiveTab("trash")}
        >
          Trash <span className="badge">{trashItems.length}</span>
        </button>
      </div>

      <TodoInput groupId={groupId!} />

      <h3 className="section-title">
        {isTasks ? "YOUR TASKS" : "TRASH"}
      </h3>

      <TodoList
        items={isTasks ? activeItems : trashItems}
        emptyText={
          isTasks
            ? "Nothing here yet — add your first task!"
            : "Trash is empty"
        }
      />
    </div>
  )
}