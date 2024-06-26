import { checkEmailWithoutConfirmation, checkPassword } from "../checkFields"
import { BACK_URL } from "../constants"

export const login = async (email = null, password) => {
    const [checkedEmail, emailMessage] = checkEmailWithoutConfirmation(email)
    if (checkedEmail){
        const [checkedPassword, passwordMessage] = checkPassword(password)
        if (checkedPassword){
            const response = await fetch(BACK_URL+'/auth/login/',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await response.json()
            if (response.ok){
                return [
                    true, 
                    [
                        data.access,
                        data.refresh
                    ], 
                    'tokens'
                ]
            }
            else{
                if (data.message===undefined || data.field===undefined){
                    throw Error('Unknown error happened')
                }
                return [false, data.message, data.field]
            }
        }
        return [false, passwordMessage, 'password']
    }
    return [false, emailMessage, 'email/emailConfirmation']
}

export const loginGuestUser = async (username) => {
    const response = await fetch(BACK_URL+'/auth/login_with_username/',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password:'123'
        })
    })
    const data = await response.json()
    return [data.access, data.refresh]
}