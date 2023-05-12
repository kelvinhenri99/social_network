import React from 'react'
import { useAuth } from '../../contexts/AuthContext';

import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate()
  const { signOut } = useAuth();


  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login')
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  )
}

export default HomePage