import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';

const LoginPageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const LoginForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '400px',
  padding: '16px',
  borderRadius: '4px',
  backgroundColor: '#fff',
});

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, token } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signIn(email, password);
      if(token) {
        navigate('/home')
      }
      console.log('Você está logado!');
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <LoginPageContainer>
      <LoginForm onSubmit={handleSignIn}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
          fullWidth
        />
        <Button variant="contained" type="submit" fullWidth>
          Entrar
        </Button>
      </LoginForm>
    </LoginPageContainer>
  );
}

export default LoginPage;
