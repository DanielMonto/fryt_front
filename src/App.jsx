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
import { useEffect } from "react"

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('Service Worker registered with scope: ', registration.scope)
      }).catch(error => {
        console.log('Service Worker registration failed: ', error)
      })
    }
  },[])
  return (
    <AuthProvider>
      <NavBarProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage/>
              </ProtectedRoute>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot_password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/" element={
              <ProtectedRoute>
                <ResetPasswordPage/>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </NavBarProvider>
    </AuthProvider>
  )
}

export default App
