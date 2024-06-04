import { checkCode, checkEmailWithoutConfirmation } from "../checkFields"
import { BACK_URL } from "../constants"

export const mailResetCode = async (email) => {
    const [exit, message] = checkEmailWithoutConfirmation(email)
    if (!exit){
        return [exit, message]
    }
    const response = await fetch(BACK_URL+'/forgot_password/',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email
        })
    })
    if (!response.ok){
        const data = await response.json()
        if (data.message===undefined){
            throw Error('Unknown error happened')
        }
        return [false, data.message]
    }
    return [true, 'Email sended successfully']
}

export const resetPasswordWithCode = async (code, new_password, new_password_confirmation) => {
    const [exit, message] = checkCode(code)
    if (!exit){
        return [exit, message]
    }
    const response = await fetch(BACK_URL+'/forgot_password/',{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            code,
            new_password,
            new_password_confirmation
        })
    })
    if (!response.ok) {
        const data = await response.json()
        if (data.message===undefined || data.field===undefined) {
            throw Error('Unknown error happened')
        }
        return [false, data.message, data.field]
    }
    return [true, 'Password reset successfully','new_password']
}