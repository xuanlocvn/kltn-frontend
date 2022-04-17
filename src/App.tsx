import React from 'react';
import './App.scss';
import Header from './components/shared/Header/Header';
import Router from './routes/routes';

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
    </div>
  );
}
export default App;
