import React from 'react';
import { GoCalendar } from 'react-icons/go';
import { axiosWithCredentials } from '../helpers/apiService';
import axios from 'axios';
import { baseUrl } from '../main';
import { useNavigate } from 'react-router-dom';
const Navbar = ({ isAuth, activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout=async()=>{
    try {
      const response = await axios.get(`${baseUrl}/auth/logout`,{
        withCredentials: true
      });
      if (response.status===200) {
        // window.location.reload(); 
        navigate("/")
      } else {
        console.error('Failed to logout');
      }
    }
    catch (error) {
    console.error('Error:', error);
  }
  }

  return (
    <nav className='bg-primary p-3 flex justify-between items-center'>
      <GoCalendar color='white' className='ml-20' />
      {isAuth ? (
        <div className='flex space-x-4'>
          <button 
            className={`${activeTab === 'login' ? 'bg-white text-primary px-4 py-2 rounded-xl ' : ' text-white'}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`${activeTab === 'signup' ? 'bg-white text-primary px-4 py-2 rounded-xl ' : ' text-white'}`}
            onClick={() => setActiveTab('signup')}
          >
            Signup
          </button>
        </div>
      ) : (
        <button className='bg-tertiary px-6 py-2 rounded-xl mr-20 text-white' onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
