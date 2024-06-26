import { BACK_URL } from "../constants"

export const logout = async (refreshToken) => {
    const response = await fetch(BACK_URL+'/auth/',{
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
            },
        body: JSON.stringify({
            'refresh_token':refreshToken
        })
    })
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