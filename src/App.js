import React from 'react';
import { Container } from 'semantic-ui-react';
// components import
import Events from './components/Events';
// styling
import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return ( 
    <Container>
      <Events />
    </Container>
  );
}

/*<a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */
export default App;
