import {useState, useEffect, use} from 'react'
import { useNavigate } from 'react-router-dom';

import authService from '../services/authServices'; 
import useAuthHook from '../hooks/authHook';

function UserSignin() {
  const { userData, setUserData } = useAuthHook();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.isLoggedIn) {
      navigate('/'); // redirect home if logged in
    }
  }, [userData, navigate]);

  const handelSignin = () => {
    if (!email || !password) {
      alert('Please fill all the fields')
      return
    }
    const userData = {
      email: email,
      password: password,
    }

    authService.userSignIn(userData)
      .then((response) => {
        setUserData({ isLoggedIn: true, user: response.user });
      })
      .catch((error) => {
        setError('Failed to sign in. Please check your credentials and try again.');
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center font-sans">
      <div role="main" aria-label="Sign in form" className="bg-white rounded-xl shadow-lg max-w-md w-full p-10">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">

            <span className="block sm:inline">{error}</span>
            </div>)
          }
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Sign In</h2>
        <form id="signInForm" className="flex flex-col space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="you@example.com" 
              onChange = {(e) => setEmail(e.target.value)}
              required 
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter your password" 
              onChange = {(e) => setPassword(e.target.value)}
              required 
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
          </div>

          <a>
            <button 
            type="submit" 
            onClick = {(e) =>{
              e.preventDefault();
              handelSignin()
            }}
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-md hover:bg-purple-700 transition">
            Sign In
          </button>
          </a>

          <div className="text-right">
            <a href="#" tabIndex="0" className="text-purple-600 hover:text-purple-700 text-sm font-medium">Forgot password?</a>
          </div>
        </form>
      </div>
  </ div >

  )
}

export default UserSignin