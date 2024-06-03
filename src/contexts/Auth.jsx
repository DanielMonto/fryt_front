import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BACK_URL } from "@/services/constants";
import { refreshTokenFunction } from "@/services/auth/refreshToken";

export const AuthContext = createContext(['',''])

export function AuthProvider({ children }) {
    const navigate = useNavigate()
    const [accessToken, setAccessToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState(null)

    const handleLogin = (access_token, refresh_token) => {
        setLogged(true)
        const [decodedAccess, decodedRefresh] = [jwtDecode(access_token), jwtDecode(refresh_token)]
        setRefreshToken(refresh_token)
        setAccessToken(access_token)
        setUser(getUser())
        window.localStorage.setItem('ffr-auth-accessTokenExp',decodedAccess.exp.toString())
        window.localStorage.setItem('ffr-auth-refreshTokenExp',decodedRefresh.exp.toString())
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
        window.localStorage.removeItem('ffr-auth-accessTokenExp')
        window.localStorage.removeItem('ffr-auth-refreshTokenExp')
    }

    const refreshTokens = async () => {
        const [exit, tokens] = await refreshTokenFunction(refreshToken)
        if (exit) {
            const [access_token, refresh_token] = tokens
            const [decodedAccess, decodedRefresh] = [jwtDecode(access_token), jwtDecode(refresh_token)]
            setAccessToken(access_token)
            setRefreshToken(refresh_token)
            window.localStorage.setItem('ffr-auth-accessTokenExp',decodedAccess.exp.toString())
            window.localStorage.setItem('ffr-auth-refreshTokenExp',decodedRefresh.exp.toString())
            window.localStorage.setItem('ffr-auth-accessToken', access_token)
            window.localStorage.setItem('ffr-auth-refreshToken', refresh_token)
        }else{
            //TODO: notification that user must login again
            navigate('/login')
        }
    }

    const fetchJWT = async (url, body = {}, method = 'GET' ) => {
        const petition = async () => {
            const response = await fetch(BACK_URL + url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify(body)
            })
            return response
        }
        if (response.status===401){
            await refreshTokens()
        }
        return petition()
    }

    useEffect(() => {
        const storedRefreshToken = window.localStorage.getItem('ffr-auth-refreshToken')
        if (storedRefreshToken!==null){
            const expRefresh = Number(window.localStorage.getItem('ffr-auth-refreshTokenExp'))
            if (isNaN(expRefresh)){
                throw Error('Happened an error with manage of exp refresh')
            }
            if (expRefresh>Math.floor(Date.now()/1000)){
                //TODO: notification that user must login again
                navigate('/login')
            }
            setRefreshToken(storedRefreshToken)
            const storedAccessToken = window.localStorage.getItem('ffr-auth-accessToken')
            if (storedAccessToken!==null){
                const expAccess = Number(window.localStorage.getItem('ffr-auth-accessTokenExp'))
                if (isNaN(expAccess)){
                    throw Error('Happened an error with manage of exp access')
                }
                if (expAccess>Math.floor(Date.now()/1000)){
                    refreshTokens()
                }
            }else{
                throw Error('Happened an error with manage of stored access')
            }
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