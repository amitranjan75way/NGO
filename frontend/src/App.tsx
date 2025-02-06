import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState, Suspense } from "react";
import { useAppSelector } from "./store/store";

// importing layouts
import Basic from "./layouts/Basic";

// importing pages
const Login = React.lazy(() => import('./pages/login'));
const Home = React.lazy(() => import('./pages/home'));
const Register = React.lazy(() => import('./pages/register'));
const UpdatePassword = React.lazy(() => import('./pages/updatePassword'));
const Profile = React.lazy(() => import('./pages/profile'));
const ForgotPassword = React.lazy(() => import('./pages/forgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/resetPassword'));
const NotFound = React.lazy(() => import('./pages/notfound'));
const PlanSubscribe = React.lazy(() => import('./pages/planSubscribe'));
const AllPaymentMethod = React.lazy(() => import('./pages/allPaymentMethod'));
const AddPaymentMethod = React.lazy(() => import('./pages/addPaymentMethod'));
const AddFundingPlan = React.lazy(() => import('./pages/addFundingPlan'));

// importing components
import PublicRoute from "./components/auth/PublicRoutes";
import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./layouts/Dashboard";

// importing skeleton loding pages
import ForgotPasswordSkeleton from "./pages/forgotPassword/ForgotPasswordSkeleton";
import LoginFormSkeleton from "./pages/login/LoginSkeleton";
import NotFoundSkeleton from "./pages/notfound/NotFoundSkeleton";
import ProfileSkeleton from "./pages/profile/ProfileSkeleton";
import SignupFormSkeleton from "./pages/register/RegisterFormSkeleton";
import ResetPasswordSkeleton from "./pages/resetPassword/ResetPasswordSkeleton";
import UpdatePasswordSkeleton from "./pages/updatePassword/UpdatePasswordSkeleton";
import SkeletonPlanSubscribe from "./pages/planSubscribe/SkeletonPlanSubscribe";
import AddFundingPlanSkeleton from "./pages/addFundingPlan/AddFundingPlanSkeleton";
import AddPaymentMethodSkeleton from "./pages/addPaymentMethod/AddPaymentMethodSkeleton";
import SkeletonAllPaymentMethod from "./pages/allPaymentMethod/SkeletonAllPaymentMethod";


function App() {
  const authData = useAppSelector((store) => store.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setIsAuthenticated(authData.isAuthenticated || false);
  }, [authData]);

  return (
    <Routes>
      <Route element={<Basic />}>
        {/* Home page ... */}
        <Route path="/" element={<Home />} />
        <Route path="/add-plan" element={<AddFundingPlan />} />

        {/* Public Routes */}
        <Route element={<PublicRoute isAuthenticated={isAuthenticated} />} >
          <Route path="/login" element={
            <Suspense fallback={<LoginFormSkeleton />}>
              <Login />
            </Suspense>
          } />
          <Route path="/register" element={
            <Suspense fallback={<SignupFormSkeleton />} >
              <Register />
            </Suspense>
          } />
          <Route path="/forgot-password" element={
            <Suspense fallback={<ForgotPasswordSkeleton />}>
              <ForgotPassword />
            </Suspense>
          } />
          <Route path="/reset-password/:token" element={
            <Suspense fallback={<ResetPasswordSkeleton />}>
              <ResetPassword />
            </Suspense>
          } />
        </Route>


        {/* Private Routes */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/update-password" element={
            <Suspense fallback={<UpdatePasswordSkeleton />}>
              <UpdatePassword />
            </Suspense>
          } />
          <Route path="/subscribe" element={
            <Suspense fallback={<SkeletonPlanSubscribe />}>
              <PlanSubscribe />
            </Suspense>
          } />
        </Route>
      </Route>

      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={
            <Suspense fallback={<ProfileSkeleton />}>
              <Profile />
            </Suspense>
          } />
          <Route path="add-plan" element={
            <Suspense fallback={<AddFundingPlanSkeleton />}>
              <AddFundingPlan />
            </Suspense>
          } />
          <Route path="add-payment-method" element={
            <Suspense fallback={<AddPaymentMethodSkeleton />}>
              <AddPaymentMethod />
            </Suspense>
          } />
          <Route path="payment-methods" element={
            <Suspense fallback={<SkeletonAllPaymentMethod />}>
              <AllPaymentMethod />
            </Suspense>
          } />
          <Route path="settings" element={<h1>This is setting</h1>} />
        </Route>
      </Route>

      {/* Catch-All Route (404 Page) */}
      <Route path="*" element={
        <Suspense fallback={<NotFoundSkeleton />}>
          <NotFound />
        </Suspense>
      } />
    </Routes>
  );
}

export default App;