import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { baseUrl } from '../main';
import { axiosWithCredentials } from '../helpers/apiService';
import { useNavigate } from 'react-router-dom';


const Login = ({ setActiveTab }) => {
    const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/user/login`, data ,{
        withCredentials: true
      });
      if (response.data.statusCode === 200) {
        navigate("/dashboard")
      } else {
        // Handle login errors
        console.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleAuth = () => {
    try {
      window.location.href = `${baseUrl}/auth/google/callback`;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label
           htmlFor="password"
           className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg">Login</button>
      </form>
      <p className="text-center mt-4">
        Don't have an account? <span className="text-primary cursor-pointer" onClick={() => setActiveTab('signup')}>Signup</span>
      </p>
      <div className="flex justify-center">
        <button className="bg-primary text-white py-2 px-4 mt-4 rounded-lg" onClick={handleGoogleAuth}>Login with <strong>Google</strong></button>
      </div>
    </div>
  );
};

export default Login;
