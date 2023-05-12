import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from './routes/index';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
          <AllRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
