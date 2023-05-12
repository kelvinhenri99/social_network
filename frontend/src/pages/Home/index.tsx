import React from 'react'
import { useAuth } from '../../contexts/AuthContext';


const HomePage = () => {
  const { signOut, user } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      <h2>User: {user?.name}</h2>
      <h3>User: {user?.email}</h3>
      <button onClick={signOut}>Logout</button>
      )
      }

export default HomePage

