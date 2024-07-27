import React from 'react';
import { useForm } from 'react-hook-form';
import { baseUrl } from '../main';
import { axiosWithCredentials } from '../helpers/apiService';
import axios from 'axios';

const Signup = ({ setActiveTab }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/user/register`, data ,{
        withCredentials: true
      });
      if (response.status === 201) {
        // Handle successful registration (e.g., redirect to login or dashboard)
        setActiveTab('login');
      } else {
        // Handle registration errors
        console.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleAuth = () => {
    try {
      window.location.href = `${baseUrl}/auth/google`;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            {...register('name', { required: 'Name is required' })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            {...register('confirmPassword', { required: 'Confirm Password is required' })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg">Signup</button>
      </form>
      <p className="text-center mt-4">
        Already have an account? <span className="text-primary cursor-pointer" onClick={() => setActiveTab('login')}>Login</span>
      </p>
      <div className="flex justify-center">
        <button className="bg-primary text-white py-2 px-4 mt-4 rounded-lg" onClick={handleGoogleAuth}>Signup with <strong>Google</strong></button>
      </div>
    </div>
  );
};

export default Signup;
