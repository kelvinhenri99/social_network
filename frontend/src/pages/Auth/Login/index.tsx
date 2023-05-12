import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const navigate = useNavigate()

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signIn(email, password);
      navigate('/')

    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSignIn}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;
