import React from 'react';
import { baseUrl } from '../main';

const Login = ({ setActiveTab }) => {


    const handleGoogleAuth = () => {
        try{
            window.location.href = `${baseUrl}/auth/google/callback`
        }catch(err){
            console.log(err)
        }
    }
    

    return (
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg mt-20">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" name="email" required className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input type="password" name="password" required className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg">Login</button>
            </form>
            <p className="text-center mt-4">Don't have an account?  <span className="text-primary cursor-pointer" onClick={() => setActiveTab('signup')}>{" Signup"}
                </span>
            </p>
            <div className="flex justify-center">
                <button className="bg-primary text-white py-2 px-4 mt-4 rounded-lg" onClick={handleGoogleAuth}>Login with <strong>Google</strong></button>
            </div>
        </div>
    );
};

export default Login;
