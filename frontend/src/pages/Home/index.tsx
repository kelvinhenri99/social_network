import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(8),
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(3),
}));

const Main = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(6),
  minHeight: 'calc(100vh - 190px)',
}));

const UserCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.paper,
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));


const HomePage = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();


  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
      console.log('Você está deslogado!');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Header>
      </Header>
      <Main>
        <UserCard sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          borderRadius: 2,
          boxShadow: 1,
          bgcolor: 'background.paper'
        }}>
          <Typography variant="h2" align="center" sx={{ mb: 2 }}>
            Bem-vindo(a), {user?.name}!
          </Typography>
          <Typography variant="h3" align="center">
            Seu e-mail cadastrado é: {user?.email}
          </Typography>
          <LogoutButton variant="contained" onClick={handleSignOut} sx={{ mt: 2 }}>
            Logout
          </LogoutButton>
        </UserCard>
      </Main>
    </Container>
  );
};

export default HomePage;
