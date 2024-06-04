import React, { useEffect, useId, useState } from 'react'
import BaseInput from '../inputs/BaseInput'
import { checkCode, checkEmailWithoutConfirmation } from '@/services/checkFields'
import useInputChange from '@/hooks/useInputChange'
import { mailResetCode, resetPasswordWithCode } from '@/services/auth/forgotPassword'
import { checkPassword } from '@/services/checkFields'
import { useNavigate } from 'react-router-dom'

function ForgotPasswordForm() {
    const emailToSendCodeId = useId()
    const codeId = useId()
    const newPasswordId = useId()
    const newPasswordConfirmationId = useId()

    const navigate = useNavigate()

    const [[email, emailError], handleEmailChange, setEmail] = useInputChange(checkEmailWithoutConfirmation)
    const [[code, codeError], handleCodeChange, setCode] = useInputChange(checkCode)
    const [
        [
            newPassword,
            newPasswordError
        ],
        handleNewPasswordChange,
        setNewPassword
    ] = useInputChange(checkPassword)
    const [
        [
            newPasswordConfirmation,
            newPasswordConfirmationError
        ],
        handleNewPasswordConfirmationChange,
        setNewPasswordConfirmation
    ] = useInputChange(checkPassword)

    const [emailSent, setEmailSent] = useState(false)

    const handleCheckPassword = (value, isConfirmation = false) => {
        if (!isConfirmation) {
            handleNewPasswordChange(value)
            if (value !== newPasswordConfirmation) {
                setNewPassword([value, 'Passwords do not match'])
                setNewPasswordConfirmation([newPasswordConfirmation, 'Passwords do not match'])
            } else {
                handleNewPasswordConfirmationChange(newPasswordConfirmation)
            }
        } else {
            handleNewPasswordConfirmationChange(value)
            if (value !== newPassword) {
                setNewPassword([newPassword, 'Passwords do not match'])
                setNewPasswordConfirmation([value, 'Passwords do not match'])
            } else {
                handleNewPasswordChange(newPassword)
            }
        }
    }

    const handleSubmitEmail = (event) => {
        event.preventDefault()
        mailResetCode(email).then(([exit, message]) => {
            if (!exit) {
                setEmail([email, message])
            }else{
                setEmailSent(true)
            }
        })
    }

    const handleSubmitCode = (event) => {
        event.preventDefault()
        resetPasswordWithCode(
            code,
            newPassword,
            newPasswordConfirmation
        ).then(([exit, message, field]) => {
            if (!exit) {
                const fields = field.split('/')
                fields.map(fieldName => {
                    if (fieldName=='code'){
                        setCode([code,message])
                    }else if (fieldName=='new_password'){
                        setNewPassword([newPassword,message])
                    }else if (fieldName=='new_password_confirmation'){
                        setNewPasswordConfirmation([newPasswordConfirmation,message])
                    }
                })
            }else{
                //TODO: notification saying password changed
                navigate('/login')
            }
        })
    }

    useEffect(() => {
        setEmailSent(false)
    },[])

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
                    errorMessage={emailError}
                    onChangeFunction={handleEmailChange}
                />

                <div className='nf-submit'>
                    <button className='nf-button' type="submit">
                        Request code
                    </button>
                </div>

                {
                    emailSent 
                    && 
                    <p className='nf-success-text'>
                        We have send an email with a code to submit here:
                    </p>
                }

            </form>

            <form className='nf-form' onSubmit={(e)=>handleSubmitCode(e)}>
                <div className='nf-title'>
                    <h3 className='nf-title-text'>
                        Submit your data
                    </h3>
                </div>

                <BaseInput 
                    inputId={codeId}
                    labelMessage='Reset password code:'
                    inputPlaceholder='0a0a0a0'
                    inputValue={code}
                    errorMessage={codeError}
                    onChangeFunction={handleCodeChange}
                />

                <BaseInput 
                    inputId={newPasswordId}
                    labelMessage='New password:'
                    inputPlaceholder='Password123'
                    inputValue={newPassword}
                    errorMessage={newPasswordError}
                    onChangeFunction={handleCheckPassword}
                />

                <BaseInput 
                    inputId={newPasswordConfirmationId}
                    labelMessage='Confirm password:'
                    inputPlaceholder='Password123'
                    inputValue={newPasswordConfirmation}
                    errorMessage={newPasswordConfirmationError}
                    onChangeFunction={(value) => {
                        handleCheckPassword(value,true)
                    }}
                />

                <div className='nf-submit'>
                    <button className='nf-button' type="submit">
                        Reset password
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordForm