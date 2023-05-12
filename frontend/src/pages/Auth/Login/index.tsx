import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';


import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const navigate = useNavigate()

import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signOut, user} = useAuth();


  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signIn(email, password);
      navigate('/')

    } catch (err) {
      console.log(err);
    }
  }


  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login')
    } catch (err) {
      console.log(err);
    }
  }

   if (user) {
    navigate('/');
  }



  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleSignOut}>Logout</button>

      <form onSubmit={handleSignIn}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;
