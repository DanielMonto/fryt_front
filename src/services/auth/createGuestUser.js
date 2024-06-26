import { BACK_URL } from "../constants"

export const createGuestUser = async () => {
    const response = await fetch(BACK_URL+'/auth/create_guest/',{
        method:'POST',
        headers: {
            'Content-type': 'application/json'
        }
    })
    const data = await response.json()
    return data.user
}