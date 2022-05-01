import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import SpinnerApp from './components/shared/Spinner/Spinner';
import Header from './components/shared/Header/Header';
import Router from './routes/routes';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<SpinnerApp />}>
        <div className="container">
          <BrowserRouter>
            <Header />
            <Router />
          </BrowserRouter>
        </div>
      </Suspense>
    </div>
  );
}
export default App;
