import React, { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import AdminPage from "src/pages/admin/AdminPage"
import ProductListPage from "src/pages/product/product-list/ProductListPage"
import ScholarshipDetail from "../pages/scholarship/scholarship-detail/ScholarshipDetail"
import TuitionDetail from "../pages/tuition/tuition-detail/TuitionDetail"
const NotFound = lazy(() => import("src/components/shared/NotFound/NotFound"))
const MissionDetail = lazy(
  () => import("src/pages/mission/mission-detail/MissionDetail"),
)
const MissionListPage = lazy(
  () => import("src/pages/mission/mission-list/MissionListPage"),
)
const ScholarshipListPage = lazy(
  () => import("src/pages/scholarship/scholarship-list/ScholarshipListPage"),
)
const SignInPage = lazy(() => import("src/pages/sign-in/SignInPage"))
const StudentPage = lazy(() => import("src/pages/student-info/StudentPage"))
const SubjectListPage = lazy(
  () => import("src/pages/subject/subject-list/SubjectListPage"),
)
const TuitionListPage = lazy(
  () => import("src/pages/tuition/tuition-list/TuitionListPage"),
)

const SubjectDetail = lazy(
  () => import("src/pages/subject/subject-detail/SubjectDetail"),
)
const ProductDetail = lazy(
  () => import("src/pages/product/product-detail/ProductDetail"),
)

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sign-in" replace />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/student/:address" element={<StudentPage />} />

      <Route path="/missions" element={<MissionListPage />} />
      <Route path="/missions/:missionId" element={<MissionDetail />} />

      <Route path="/subjects" element={<SubjectListPage />} />
      <Route path="/subjects/:subjectId" element={<SubjectDetail />} />

      <Route path="/scholarships" element={<ScholarshipListPage />} />
      <Route
        path="/scholarships/:scholarshipId"
        element={<ScholarshipDetail />}
      />

      <Route path="/tuitions" element={<TuitionListPage />} />
      <Route path="/tuitions/:tuitionId" element={<TuitionDetail />} />

      <Route path="products" element={<ProductListPage />} />
      <Route path="products/:productId" element={<ProductDetail />} />

      <Route path="admin/:adminAddress" element={<AdminPage />} />

      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
