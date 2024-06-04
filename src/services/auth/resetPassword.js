import { useContext } from "react"
import { AuthContext } from "../../contexts/Auth"


export const resetPassword = async (old_password, new_password, new_password_confirmation) => {
    const { fetchJWT } = useContext(AuthContext)
    const response = await fetchJWT(
        url = '/auth/reset_password/',
        body = {
            old_password,
            new_password,
            new_password_confirmation
        },
        method = 'POST'
    )
    if (!response.ok){
        const data = await response.json()
        if (data.message===undefined || data.field===undefined){
            throw Error('Unknown error happened')
        }
        return [false, data.message, data.field]
    }
    return [true, 'Password reset', 'new_password']
}