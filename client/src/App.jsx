import React, { useContext } from 'react'
import { Navigate, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import bgImage from './assets/bgImage.svg';
import {Toaster} from "react-hot-toast";
import { AuthContext } from '../context/AuthContext'

const App = () => {
  const {authUser} = useContext(AuthContext);
  return (
    <div
      style={{backgroundImage: `url(${bgImage})`}} 
      className="bg-center w-full border border-b bg-contain min-h-screen">
      <Toaster />
      <Routes>
        <Route>
          {/* Base Routing */}
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
