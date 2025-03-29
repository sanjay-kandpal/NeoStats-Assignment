// client/src/components/dashboard/Dashboard.jsx
import { useEffect,useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allusers,setUsers] = useState([]);
  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/login');
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/allusers');
        console.log(response.data.user);
        setUsers(response.data.user)
      } catch (err) {
        // If error is 401, user is not authenticated (expected)
        if (err.response && err.response.status !== 401) {
          setError('Failed to load user data');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {user && (
        <div className="user-info">
          <p>Welcome, {user.username}!</p>
          <p>Email: {user.email}</p>
          
        </div>

      )}

      {allusers.map((user)=>(
        <>
        

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  {user.email}
                </th>
                <th scope="col" class="px-6 py-3">
                 {user.username}
                </th>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  <button className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'>Delete</button> 
                </th> 
            </tr>
        </thead>
        
    </table>
</div>

        </>
      ))}



      
      <div className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
        <button onClick={handleLogout} >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;