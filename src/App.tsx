import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
const Header = React.lazy(() => import('./components/shared/Header/Header'));
const Router = React.lazy(() => import('./routes/routes'));
import Spinner from 'react-bootstrap/Spinner';

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="loading">
            <div className="spinner">
              <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="secondary" />
              <Spinner animation="grow" variant="success" />
              <Spinner animation="grow" variant="danger" />
              <Spinner animation="grow" variant="warning" />
              <Spinner animation="grow" variant="info" />
              <Spinner animation="grow" variant="light" />
              <Spinner animation="grow" variant="dark" />
            </div>
          </div>
        }
      >
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
