import { Link, useParams } from "react-router-dom"
import { useTodoStore } from "../../store/todoStore"
import TodoList from "../../components/TodoList/todoList"
import TodoInput from "../../components/TodoInput/todoInput"
import "./GroupPage.css"
import { useState } from "react"
import Tabs from "../../components/Tabs/Tabs"

export default function GroupPage() {
  const { groupId } = useParams()

  const todos = useTodoStore((s) => s.todos)
  const groups = useTodoStore((s) => s.groups)
  const activeTab = useTodoStore((s) => s.activeTab)
  const setActiveTab = useTodoStore((s) => s.setActiveTab)
  const [hideDone, setHideDone] = useState(false)

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

  const activeItems = filteredTodos.filter((t) => {
      if (!t.isActive) return false

      if (hideDone) {
        return !t.completed
      }

      return true
  })
  const trashItems = filteredTodos.filter((t) => !t.isActive)
  const doneItems = filteredTodos.filter((t) => t.isActive && t.completed)

  const tabConfig = {
      tasks: {
        getItems: () => activeItems,
        title: "TASKS",
        emptyText: "Nothing here yet — add your first task!",
      },
      done: {
        getItems: () => doneItems,
        title: "COMPLETED TASKS",
        emptyText: "No completed tasks yet",
      },
      trash: {
        getItems: () => trashItems,
        title: "TRASH",
        emptyText: "Trash is empty",
      },
  } as const

  const currentTab = tabConfig[activeTab];
  const visibleItems = currentTab.getItems();

  const tabs = [
    { key: "tasks", label: "Tasks", count: activeItems.length },
    { key: "done", label: "Done", count: doneItems.length },
    { key: "trash", label: "Trash", count: trashItems.length },
  ] as const

  return (
    <div className="page">

      <div className="header">
        <h2>
          do<span className="dot">.</span>it
        </h2>
      </div>

      <span className="group-title">{group.title}</span>
      <div className="tabs-row">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="toggle-wrapper">
          <span>Hide done</span>
          <button
            className={`toggle ${hideDone ? "active" : ""}`}
            onClick={() => setHideDone((prev) => !prev)}
          >
            <div className="toggle-ball" />
          </button>
        </div>
      </div>
      <TodoInput groupId={groupId!} />

      <h3 className="section-title">
        {currentTab.title}
      </h3>

      <TodoList
        items={visibleItems}
        emptyText={currentTab.emptyText}
      />
    </div>
  )
}