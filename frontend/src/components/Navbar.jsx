import React from 'react'
import {useAuthStore} from '../store/authStore.js'
import { useChatStore } from '../store/chatStore.js';
import { LogOut, MessageSquare, Settings, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const {logout, authUser} = useAuthStore();
  const {setSelectedUser} = useChatStore();

  const logoutHandler = async () => {
    await logout();
    setSelectedUser(null); // also remove selected user to avoid any issues
  }

  return (
    <nav className='border-b border-base-300 fixed w-full top-0 z-40
    backdrop-blur-lg bg-base-100/80'>
      <div className='container mx-auto px-4 h-16'>
        <div className='flex items-center justify-between h-full'>

          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </Link>
          </div>

          <div className='flex items-center gap-3'>
            <Link
              to={"/settings"}
              className={`btn btn-sm gap-2 transition-colors`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            {
              // ! if user is authenticated then only we will show profile & logout button
              authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <UserRound className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logoutHandler}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar