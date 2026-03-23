import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import GroupPage from "./pages/GroupPage"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/groups/:groupId" element={<GroupPage />} />
        </Routes>

      </div>
    </div>
  )
}

export default App