import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Login from '../components/Login';
import Signup from '../components/Signup';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login'); 

  return (
    <div>
      <Navbar isAuth={true} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {activeTab === 'login' ? <Login setActiveTab={setActiveTab} /> : <Signup setActiveTab={setActiveTab}/>}
      </div>
    </div>
  );
};

export default Auth;
