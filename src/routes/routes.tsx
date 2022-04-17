import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from 'src/components/shared/NotFound/NotFound';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sign-in" replace />} />
      <Route
        path="/student-info"
        element={<Navigate to="/not-found" replace />}
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
