import { BrowserRouter as Router, Route, Routes  } from "react-router-dom"
import { HomePage } from "@/components/pages/HomePage"
import LoginPage from "@/components/pages/LoginPage"
import '@/styles/App.css'
import { NavBarProvider } from "@/contexts/NavBar"
import RegisterPage from "@/components/pages/RegisterPage"
import ForgotPasswordPage from "@/components/pages/ForgotPasswordPage"
import { AuthProvider } from "@/contexts/Auth"
import ProtectedRoute from "@/components/ProtectedRoute"
import ResetPasswordPage from "@/components/pages/ResetPasswordPage"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <>
      <ToastContainer/>
      <NavBarProvider>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <HomePage/>
                </ProtectedRoute>
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot_password" element={<ForgotPasswordPage />} />
              <Route path="/reset_password/" element={
                <ProtectedRoute>
                  <ResetPasswordPage/>
                </ProtectedRoute>
              } />
            </Routes>
          </AuthProvider>
        </Router>
      </NavBarProvider>
    </>
  )
}

export default App
