import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import SpinnerApp from './components/shared/Spinner/Spinner';
const Header = React.lazy(() => import('./components/shared/Header/Header'));
const Router = React.lazy(() => import('./routes/routes'));

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
