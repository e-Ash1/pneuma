import React, { useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

function SignUpLoginForm({ isVisible, setIsVisible }) {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle switch the displays between Login/Signup Forms
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = () => setIsSignUp(!isSignUp);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gonna add the submission logic right here !!!
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} bg-black bg-opacity-50 z-50`}>
      <div className='relative flex flex-col items-center p-10 bg-blue-50 rounded-3xl shadow-lg font-sans space-y-6'>
        <button onClick={() => setIsVisible(false)} className='absolute top-3 right-3 text-2xl'>
          <MdClose />
        </button>
        <h1 className='text-4xl font-light mb-4 text-blue-900'>
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h1>
        <form onSubmit={handleSubmit} className='w-full max-w-lg space-y-6'>
          <input className='input input-bordered w-full rounded-lg focus:ring-2 focus:ring-blue-300 py-4 text-lg' type='email' placeholder='Email Address' />
          <div className='relative w-full'>
            <input className='input input-bordered w-full rounded-lg py-4 text-lg' type={showPassword ? 'text' : 'password'} placeholder='Password' />
            <button type='button' onClick={toggleShowPassword} className='absolute inset-y-0 right-0 pr-4 flex items-center text-sm'>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button className='btn btn-primary w-full bg-blue-500 hover:bg-blue-600 rounded-lg py-4 text-lg' type='submit'>
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <div className='flex flex-col justify-center items-center my-6 gap-4 w-full'>
          <button aria-label='Sign up with Github' className='btn bg-gray-900 hover:bg-gray-700 text-white rounded-full w-full flex justify-center items-center gap-3 px-6 py-4 text-lg'>
            Continue with Github <FaGithub size='20' />
          </button>
          <button aria-label='Sign up with LinkedIn' className='btn bg-blue-600 hover:bg-blue-500 text-white rounded-full w-full flex justify-center items-center gap-3 px-6 py-4 text-lg'>
            Continue with LinkedIn <FaLinkedin size='20' />
          </button>
          <button aria-label='Sign up with Mail' className='btn bg-red-600 hover:bg-red-500 text-white rounded-full w-full flex justify-center items-center gap-3 px-6 py-4 text-lg'>
            Continue with Gmail <HiOutlineMail size='20' />
          </button>
        </div>
        <button onClick={toggleForm} className='underline text-lg text-blue-800'>
          {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default SignUpLoginForm;
