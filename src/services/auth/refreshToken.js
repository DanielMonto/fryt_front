import { BACK_URL } from "../constants"

export const refreshTokenFunction = async (refreshToken) => {
    const response = await fetch(BACK_URL+'/auth/refresh_token/',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            'refresh':refreshToken
        })
    })
    if (!response.ok) {
        if (response.status==401){
            return [false, 'Refresh token invalid']
        }else{
            throw Error('Unknown error')
        }
    }
    const data = await response.json()
    return [true, [data.access, data.refresh]]
}