import React from 'react';
import './App.scss';
import Container from './components/Container/Container';
import IDAddressTracker from './components/IDAddressTracker/IDAddressTracker';

function App() {
  return (
    <div className="App">
      <Container>
        <IDAddressTracker />
      </Container>
    </div>
  );
}

export default App;
