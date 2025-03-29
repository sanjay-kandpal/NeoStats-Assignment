// client/src/components/layout/NavBar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700" >
      <div  className="flex items-center space-x-3 rtl:space-x-reverse">
        <Link to="/" className='dark:text-white' >
          MyApp
        </Link>
        
        <ul>
          {user ? (
            <>
              <li >
                <Link to="/dashboard" >
                  Dashboard
                </Link>
              </li>
              <li >
                <button onClick={handleLogout} >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li >
                <Link to="/login">
                  Login
                </Link>
              </li>
              <li >
                <Link to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;