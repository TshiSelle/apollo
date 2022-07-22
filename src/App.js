import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/Profile/SignUp/SignUpPage";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/Profile/SignIn/LoginPage";
import ProfilePage from "./components/Profile/UserProfile/ProfilePage";
import ForgotPasswordForm from "./components/Profile/SignIn/forgot/ForgotPasswordForm";
import FullPageSpinner from "./components/spinner/FullPageSpinner";
import Page from "./components/Pages/Page";
import ForgotPasswordResetForm from "./components/Profile/SignIn/forgot/ForgotPasswordResetForm";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/HomePage/NavBar";
import SiteFooter from "./components/HomePage/Footer";
import { PageProvider } from "./context/PageContext";
import VerifyAccount from "./components/Profile/SignUp/verify/VerifyAccount";
import { UserProvider } from "./context/UserContext";
import { CloudinaryContext } from "cloudinary-react";
import ContactUsRoute from "./components/ContactUs/ContactUsRoute";
import NotFoundRoute from "./components/NotFound/NotFoundRoute";
import Footer from "./components/AboutUs/AboutUs";
import AboutUs from "./components/AboutUs/AboutUs";
import ScrollToTop from "./components/ScrollToTop/ScropllToTop";

const App = () => {
  return (
    <CloudinaryContext cloudName="Apollo">
      <AuthProvider>
        <UserProvider>
          <PageProvider>
            <Suspense fallback={<FullPageSpinner />}>
              <Suspense fallback={<FullPageSpinner />}>
                <Router>
                  <NavBar />
                  <ScrollToTop>
                    <Routes>
                      {/* Every page we create needs to have a route so we can navigate to it,
                            Imitate the routes below with a proper path when adding a new page */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/Profile" element={<ProfilePage />} />
                      <Route path="/SignUp" element={<SignUpPage />} />
                      <Route path="/SignIn" element={<LoginPage />} />
                      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
                      <Route path="/forgot-password/:username/:token" element={<ForgotPasswordResetForm />} />
                      <Route path="/verify/:username/:token" element={<VerifyAccount />} />
                      <Route path="/Page" element={<Page />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/contact" element={<ContactUsRoute />} />
                      <Route path={"/*" || "/404"} element={<NotFoundRoute />} />
                    </Routes>
                  </ScrollToTop>
                  <SiteFooter />
                </Router>
              </Suspense>
            </Suspense>
          </PageProvider>
        </UserProvider>
      </AuthProvider>
    </CloudinaryContext>
  );
};

export default App;