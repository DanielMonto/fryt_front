import React, { useId } from 'react'
import BaseInput from '../inputs/BaseInput'
import { checkCode, checkEmailWithoutConfirmation } from '@/services/checkFields'
import useInputChange from '@/hooks/useInputChange'

function ForgotPasswordForm() {
    const emailToSendCodeId = useId()
    const codeId = useId()
    const [[email, emailError], handleEmailChange] = useInputChange(checkEmailWithoutConfirmation)
    const [[code, codeError], handleCodeChange] = useInputChange(checkCode)

    const handleSubmitEmail = (event) => {
        event.preventDefault()
    }

    const handleSubmitCode = (event) => {
        event.preventDefault()
    }

    return (
        <div className='nf-container'>

            <form className='nf-form' onSubmit={(e)=>handleSubmitEmail(e)}>

                <div className='nf-title'>
                    <h3 className='nf-title-text'>
                        Submit your email
                    </h3>
                </div>

                <BaseInput 
                    inputId={emailToSendCodeId}
                    labelMessage='Reset code email:'
                    inputPlaceholder='example@gmail.com'
                    inputValue={email}
                    errorClasses='nf-error-text'
                    errorMessage={emailError}
                    onChangeFunction={handleEmailChange}
                    labelClasses='nf-text'
                    containerClasses='nf-email'
                />

                <div className='nf-submit'>
                    <button className='nf-button' type="submit">
                        Request code
                    </button>
                </div>
            </form>

            <form className='nf-form' onSubmit={(e)=>handleSubmitCode(e)}>
                <div className='nf-title'>
                    <h3 className='nf-title-text'>
                        Submit your code
                    </h3>
                </div>

                <BaseInput 
                    inputId={codeId}
                    labelMessage='Reset password code:'
                    inputPlaceholder='0a0a0a0'
                    inputValue={code}
                    errorClasses='nf-error-text'
                    errorMessage={codeError}
                    onChangeFunction={handleCodeChange}
                    labelClasses='nf-text'
                    containerClasses='nf-email'
                />

                <div className='nf-submit'>
                    <button className='nf-button' type="submit">
                        Send code
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordForm