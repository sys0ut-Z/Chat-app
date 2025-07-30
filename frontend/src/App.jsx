"use client"
import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import {useAuthStore} from './store/authStore.js'
import { useThemeStore } from './store/themeStore.js'

function App() {
  const {authUser, checkAuth, isCheckingAuth, isSigningUp, isLogginIn} = useAuthStore();
  const {theme} = useThemeStore()

  useEffect(() => {
    // TODO : add login & register loader here so that it won't interrupt the process
    if(!isSigningUp && !isLogginIn)
      checkAuth();
  }, [checkAuth]);

  // console.log({authUser});

  if(isCheckingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader size={50} className='animate-spin'/>
      </div>
    )
  }

  return (
    <div data-theme={theme}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
      </Routes>
    </div>
  )
}

export default App
