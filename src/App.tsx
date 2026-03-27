import { Routes, Route } from "react-router-dom"
import GroupPage from "./pages/GroupPage/GroupPage"
import Sidebar from "./components/Sidebar/Sidebar"
import HomePage from "./pages/HomePage/HomePage"


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