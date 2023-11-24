import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddEmployee from './pages/AddEmployee'
import ShowEmployee from './pages/ShowEmployee'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

function App() {

  return (
    <Router>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/showEmployee/:id" element={<ShowEmployee />}/>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
