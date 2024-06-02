export const checkEmail = (email, emailConfirmation) => {
    if (email === emailConfirmation) {
        if (/@/.test(email)) {
            if (/^[^@]+@/.test(email)) {
                if (/@[^@]+$/.test(email)) {
                    if (/@.*\./.test(email)) {
                        return [true, "Email is valid"]
                    } else {
                        return [false, "Email must have a dot after @ symbol"]
                    }
                } else {
                    return [false, "Email must have characters after @ symbol"]
                }
            } else {
                return [false, "Email must have characters before @ symbol"]
            }
        } else {
            return [false, "Email must have an @ symbol"]
        }
    } else {
        return [false, "Emails are not equal"]
    }
}

export const checkEmailWithoutConfirmation = (email) => checkEmail(email,email)

export const checkPassword = (password) => {
    if (password.length<8){
        return [false, "Password must have at least 8 chars"]
    }else if (!/[a-zA-Z]/.test(password)) {
        return [false, "Password must contain at least one letter"]
    } else if (!/\d/.test(password)) {
        return [false, "Password must contain at least one number"]
    } else {
        return [true, "Password is valid"]
    }
}

export const checkCode = (code) => {
    if (code.length!==7){
        return [false, "Code must be 7 length"]
    }
    return [true, "Code is valid"]
}

export const checkUsername = (username) => {
    if (username.length<4){
        return [false, "Min 4 characters"]
    }
    return [true, "Username is valid"]
}