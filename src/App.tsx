import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Header from './components/shared/Header/Header';
import Router from './routes/routes';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />
          <Router />
        </BrowserRouter>
      </Suspense>
    </div>
  );
}
export default App;
