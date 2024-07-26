import React from 'react';
import { GoCalendar } from 'react-icons/go';

const Navbar = ({ isAuth, activeTab, setActiveTab }) => {
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
        <button className='bg-tertiary px-6 py-2 rounded-xl mr-20 text-white'>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
