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
  const handleDelete= (id)=>{
    
    
  }

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
                      <th scope="col" class="px-6 py-3">
                          Username
                      </th>
                      <th scope="col" class="px-6 py-3">
                          <div class="flex items-center">
                              Email
                              <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
        </svg></a>
                          </div>
                      </th>
                      
                      
                      <th scope="col" class="px-6 py-3">
                          <button class="sr-only">Delete</button>
                      </th>
                      
                      <th scope="col" class="px-6 py-3">
                          <button class="sr-only">Edit</button>
                      </th>
                  </tr>
              </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user.username}
                        </th>
                        <td class="px-6 py-4">
                            {user.email}
                        </td>
                        
                        <td class="px-6 py-4 text-right">
                            <button href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={handleDelete(`${user._id}`)}>Delete</button>
                        </td>
                        <td class="px-6 py-4 text-right">
                            <button href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                        </td>
            
                    </tr>                    
                </tbody>
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