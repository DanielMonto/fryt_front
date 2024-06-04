import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "@/contexts/Auth"

const ProtectedRoute = ({ children }) => {
    const { logged } = useContext(AuthContext)

    if (!logged) {
        return <Navigate to="/login" replace />
    }
    return children
}

export default ProtectedRoute