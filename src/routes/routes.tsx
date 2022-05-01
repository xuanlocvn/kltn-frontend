import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
const NotFound = lazy(() => import('src/components/shared/NotFound/NotFound'));
const MissionDetail = lazy(
  () => import('src/pages/mission/mission-detail/MissionDetail'),
);
const MissionListPage = lazy(
  () => import('src/pages/mission/mission-list/MissionListPage'),
);
const ScholarshipListPage = lazy(
  () => import('src/pages/scholarship/scholarship-list/ScholarshipListPage'),
);
const SignInPage = lazy(() => import('src/pages/sign-in/SignInPage'));
const StudentPage = lazy(() => import('src/pages/student-infos/StudentPage'));
const SubjectListPage = lazy(
  () => import('src/pages/subject/subject-list/SubjectListPage'),
);

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sign-in" replace />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/student-info/:address" element={<StudentPage />} />

      <Route path="/mission" element={<MissionListPage />} />
      <Route path="/mission/:missionId" element={<MissionDetail />} />

      <Route path="/subject" element={<SubjectListPage />} />
      <Route path="/subject/:subjectId" element={<NotFound />} />

      <Route path="/scholarship" element={<ScholarshipListPage />} />
      <Route path="/scholarship/:scholarshipId" element={<NotFound />} />

      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
