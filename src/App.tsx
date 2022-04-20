import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
const Header = React.lazy(() => import('./components/shared/Header/Header'));
const Router = React.lazy(() => import('./routes/routes'));

function App() {
  return (
    <div className="App container">
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
