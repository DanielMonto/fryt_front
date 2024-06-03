import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BACK_URL } from "@/services/constants";
import { refreshTokenFunction } from "@/services/auth/refreshToken";

export const AuthContext = createContext(['',''])

export function AuthProvider({ children }) {
    const navigate = useNavigate()
    //TODO: time refresh and token time stuff
    const [accessToken, setAccessToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState(null)
    //TODO: do functions

    const handleLogin = (access_token, refresh_token) => {
        setLogged(true)
        setRefreshToken(refresh_token)
        setAccessToken(access_token)
        setUser(getUser())

        window.localStorage.setItem('ffr-auth-accessToken',accessToken)
        window.localStorage.setItem('ffr-auth-refreshToken',refreshToken)
    }

    const getUser = () => {
        if (logged){
            const decodedAccess = jwtDecode(refreshToken)
            return {
                username: decodedAccess.user.username,
                email: decodedAccess.user.email,
                is_staff: decodedAccess.user.is_staff,
                id: decodedAccess.user.id
            }
        }
        return null
    }

    const handleLogout = () => {
        setLogged(false)
        setAccessToken(null)
        setRefreshToken(null)
        setUser(null)
        window.localStorage.removeItem('ffr-auth-accessToken')
        window.localStorage.removeItem('ffr-auth-refreshToken')
    }

    const refreshTokens = async () => {
        const [exit, tokens] = await refreshTokenFunction(refreshToken)
        if (exit) {
            const [access_token, refresh_token] = tokens
            setAccessToken(access_token)
            setRefreshToken(refresh_token)
        }else{
            //TODO: notification that user must login again
            navigate('/login')
        }
    }

    const fetchJWT = async (url, body = {}, method = 'GET' ) => {
        const response = await fetch(BACK_URL + url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify(body)
        })
        if (response.status===401){
            await refreshTokens()
        }
    }

    //TODO: right use effect
    useEffect(() => {
        const storedRefreshToken = window.localStorage.getItem('ffr-auth-refreshToken')
        if (storedRefreshToken!==null){
            
        }
    },[])

    return (
        <AuthContext.Provider value={{
            refreshToken: refreshToken,
            accessToken: accessToken,
            logged: logged,
            user: user,
            handleLogin: handleLogin,
            handleLogout: handleLogout,
            refreshTokens: refreshTokens,
            fetchJWT: fetchJWT
        }}>
            {children}
        </AuthContext.Provider>
    )
}