import { BrowserRouter as Router, Route, Routes  } from "react-router-dom"
import { HomePage } from "@/components/pages/HomePage"
import LoginPage from "@/components/pages/LoginPage"
import '@/styles/App.css'
import { NavBarProvider } from "@/contexts/NavBar"
import RegisterPage from "@/components/pages/RegisterPage"
import ForgotPasswordPage from "@/components/pages/ForgotPasswordPage"
import { AuthProvider } from "@/contexts/Auth"

function App() {
  return (
    <AuthProvider>
      <NavBarProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot_password" element={<ForgotPasswordPage />} />
            {/* TODO: components-pages for these routes
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} /> */}
          </Routes>
        </Router>
      </NavBarProvider>
    </AuthProvider>
  )
}

export default App
