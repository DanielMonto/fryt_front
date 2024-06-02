import { checkEmailWithoutConfirmation } from "../checkFields"

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
    const data = await response.json()
    if (!response.ok){
        if (data.message===undefined){
            throw Error('Unknown error happened')
        }
        return [false, data.message]
    }
    return [true, 'Email sended successfully']
}