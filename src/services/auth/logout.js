import { BACK_URL } from "../constants"
import { useContext } from "react"
import { AuthContext } from "@/contexts/Auth"

export const logout = async () => {
    const { refreshToken, handleLogout } = useContext(AuthContext)
    const response = await fetch(BACK_URL+'/auth/',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
            },
        body: JSON.stringify({
            refreshToken
        })
    })
    handleLogout()
    const data = await response.json()
    if (!response.ok){
        if (data.message===undefined || data.field===undefined){
            throw Error('Unknown error happened')
        }
        return [false, data.message, data.field]
    }
    else{
        return [true, 'Logged out successfully', 'refresh_token']
    }
}