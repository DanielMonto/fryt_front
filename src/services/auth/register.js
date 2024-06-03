import { checkEmail, checkPassword } from "../checkFields"
import { BACK_URL } from "../constants"

export const register = async (email, emailConfirmation, password, username) => {
    const [checkedEmail, emailMessage] = checkEmail(email, emailConfirmation)
    if (checkedEmail){
        const [checkedPassword, passwordMessage] = checkPassword(password)
        if (checkedPassword){
            const response = await fetch(BACK_URL+'/auth/',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
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
                return [true, `user ${username} registered successfully`, 'username/email/password']
            }
        }
        return [false, passwordMessage, 'password']
    }
    return [false, emailMessage, 'email/emailConfirmation']
}