import { createContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { BACK_URL } from "@/services/constants"
import { refreshTokenFunction } from "@/services/auth/refreshToken"
import { toast } from "react-toastify"
import { createGuestUser } from "@/services/auth/createGuestUser"
import { loginGuestUser } from "@/services/auth/login"

export const AuthContext = createContext(['',''])

export function AuthProvider({ children }) {
    const navigate = useNavigate()
    const [accessToken, setAccessToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState(null)

    const handleLogin = (access_token, refresh_token) => {
        setLogged(true)
        const decodedAccess = jwtDecode(access_token)
        const decodedRefresh = jwtDecode(refresh_token)
        setRefreshToken(refresh_token)
        setAccessToken(access_token)
        setUser(getUser(decodedAccess))
        window.localStorage.setItem('ffr-auth-accessTokenExp', decodedAccess.exp.toString())
        window.localStorage.setItem('ffr-auth-refreshTokenExp', decodedRefresh.exp.toString())
        window.localStorage.setItem('ffr-auth-accessToken', access_token)
        window.localStorage.setItem('ffr-auth-refreshToken', refresh_token)
    }
    

    const getUser = (decodedAccess) => {
        if (!decodedAccess.user) {
            throw new Error("Invalid token: missing user data")
        }
        return {
            username: decodedAccess.user.username,
            email: decodedAccess.user.email,
            is_staff: decodedAccess.user.is_staff,
            is_guest: decodedAccess.user.is_guest,
            id: decodedAccess.user.id
        }
    }
    

    const handleGuest = async () => {
        const toastId = toast('Creating guest user...',{
            position: 'top-right',
            autoClose: false
        })
        const user = await createGuestUser()
        const [guestAccessToken, guestRefreshToken] = await loginGuestUser(user.username)
        handleLogin(guestAccessToken, guestRefreshToken)
        toast.dismiss(toastId)
        navigate('/')
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

    const refreshTokens = async (refreshTokenParam = null) => {
        const [exit, tokens] = await refreshTokenFunction(refreshTokenParam ?? refreshToken)
        if (exit) {
            setLogged(true)
            const [access_token, refresh_token] = tokens
            const [decodedAccess, decodedRefresh] = [jwtDecode(access_token), jwtDecode(refresh_token)]
            setAccessToken(access_token)
            setRefreshToken(refresh_token)
            window.localStorage.setItem('ffr-auth-accessTokenExp',decodedAccess.exp.toString())
            window.localStorage.setItem('ffr-auth-refreshTokenExp',decodedRefresh.exp.toString())
            window.localStorage.setItem('ffr-auth-accessToken', access_token)
            window.localStorage.setItem('ffr-auth-refreshToken', refresh_token)
        }else{
            toast('You must login',{
                position: 'bottom-center'
            })
            handleLogout()
            navigate('/login')
        }
    }

    const fetchJWT = async (url, body = {}, method = 'GET') => {
        let response = await fetch(BACK_URL + url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify(body)
        })

        if (response.status === 401) {
            await refreshTokens()
            response = await fetch(BACK_URL + url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify(body)
            })
        }
        return response
    }

    useEffect(() => {
        setLogged(false)
        const storedRefreshToken = window.localStorage.getItem('ffr-auth-refreshToken')
        if (!storedRefreshToken){
            handleGuest()
            return undefined
        }
        const expRefresh = Number(window.localStorage.getItem('ffr-auth-refreshTokenExp'))
        if (isNaN(expRefresh) || expRefresh < Math.floor(Date.now()/1000)) {
            if (isNaN(expRefresh)){
                handleGuest()
                return undefined
            }
            toast('You must login now',{
                position: 'bottom-center'
            })
            handleLogout()
            navigate('/')
            return undefined
        }
        const storedAccessToken = window.localStorage.getItem('ffr-auth-accessToken')
        if (!storedAccessToken){
            handleGuest()
            return undefined
        }
        const expAccess = Number(window.localStorage.getItem('ffr-auth-accessTokenExp'))
        if (isNaN(expAccess) || expAccess < Math.floor(Date.now()/1000)) {
            if (isNaN(expRefresh)){
                handleGuest()
                return undefined
            }
            refreshTokens(storedRefreshToken)
            return undefined
        }
        handleLogin(storedAccessToken, storedRefreshToken)
        navigate('/')
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