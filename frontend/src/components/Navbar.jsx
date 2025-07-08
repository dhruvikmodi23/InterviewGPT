import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary-600">AI Interviewer</Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/interview" className="px-3 py-2 text-gray-700 hover:text-primary-600">
                New Interview
              </Link>
              <Link to="/history" className="px-3 py-2 text-gray-700 hover:text-primary-600">
                History
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 text-gray-700 hover:text-primary-600">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar