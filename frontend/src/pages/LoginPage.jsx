import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore.js';
import {Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, UserRound} from 'lucide-react'
import {Link} from 'react-router-dom' 
import AuthImagePattern from '../components/AuthImagePattern.jsx';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const {login, isLogginIn} = useAuthStore();

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData(prev => ({...prev, [name]:value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    login(data); // * store updated data in zustand store
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>

      {/* Left Side */}
      <div className='flex flex-col items-center justify-center'>
        <div className='w-full max-w-md space-y-8'>

          {/* Profile Image */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-sm sm:text-base text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email */}
            <div className='form-control space-y-1'>
              <label className='label max-sm:pl-2'>
                <span className='label-text font-medium text-sm sm:text-base'>Email</span>
              </label>
              <div className='relative max-sm:px-2'>
                <div className='absolute inset-y-0 left-0 pl-5 sm:pl-3 flex items-center pointer-events-none z-10'>
                  <Mail size={17} strokeWidth={0.75} />
                </div>
                <input type="text"
                  className='input input-bordered w-full pl-10 pr-3'
                  placeholder='johndoe@gmail.com'
                  value={data.email}
                  name="email"
                  onChange={changeHandler}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className='form-control space-y-1'>
              <label className='label max-sm:pl-2'>
                <span className='label-text font-medium text-sm sm:text-base'>Password</span>
              </label>
              <div className='relative max-sm:px-2'>
                <div className='absolute inset-y-0 left-0 pl-5 sm:pl-3 flex items-center pointer-events-none z-10'>
                  <Lock size={17} strokeWidth={0.75} />
                </div>
                <input type={showPassword ? "text" : "password"}
                  className='input input-bordered w-full pl-10 pr-3'
                  placeholder='••••••'
                  value={data.password}
                  name="password"
                  onChange={changeHandler}
                  required
                />
                <button type="button"
                  className='absolute inset-y-0 right-0 pr-3 flex items-center z-10'
                  onClick={() => setShowPassword(prev => !prev)}
                > 
                  {
                    showPassword ? 
                    <EyeOff size={17} strokeWidth={0.75}/> : 
                    <Eye size={17} strokeWidth={0.75}/>
                  }
                </button>
              </div>
            </div>
            
            <div className='flex justify-center items-center max-sm:px-2'>
              <button type="submit" className='text-xs sm:text-sm btn btn-primary w-full' disabled={isLogginIn}>
                {
                  isLogginIn ? (
                    <>
                      <Loader2 className='size-5 animate-spin'/>
                      Loading...
                    </>
                  ) : (
                    "Sign In"
                  )
                }
              </button>
            </div>
          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>
              Create a new account{" "}
              <Link to="/signup" className='link link-primary'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern />
    </div>
  )
}

export default LoginPage