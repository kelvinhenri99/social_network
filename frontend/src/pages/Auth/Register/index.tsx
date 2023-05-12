import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { styled } from '@mui/material/styles';
import { Box, Button, TextField, Typography } from '@mui/material';

const RegisterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(8),
}));

const RegisterForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '400px',
  padding: '16px',
  borderRadius: '4px',
  backgroundColor: '#fff',
}));

const RegisterButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await register(name, email, password);
      navigate('/login');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <RegisterButton variant="contained" type="submit">Register</RegisterButton>
        {error && <Typography variant="body1" color="error">{error}</Typography>}
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;
