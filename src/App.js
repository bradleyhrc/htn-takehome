import React from 'react';
import { Container } from 'semantic-ui-react';
// components import
import Events from './components/Events';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import Load from './components/Load';
// styling
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { useAuth0 } from '@auth0/auth0-react';


function App() {
  // loading implementation
  const { isLoading } = useAuth0();
  if (isLoading) return <Load />

  return (
    <Container>
      <div className='wrap'>
        <Profile></Profile>
        <Events />
      </div>
    </Container>
  );
}

export default App;
