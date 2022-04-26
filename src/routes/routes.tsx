import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from 'src/components/shared/NotFound/NotFound';
import MissionListPage from 'src/pages/mission-list/MissionListPage';
import SignInPage from 'src/pages/Sign-in/SignInPage';
import StudentPage from 'src/pages/student-infos/StudentPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sign-in" replace />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/student-info/:address" element={<StudentPage />} />
      <Route path="/mission" element={<MissionListPage />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
