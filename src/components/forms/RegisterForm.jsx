import React from 'react'
import { register } from '@/services/auth/register'
import { useId, useState } from 'react'
import EyeSlashIcon from '@/components/icons/EyeSlashIcon'
import { checkEmailWithoutConfirmation, checkPassword, checkUsername } from '@/services/checkFields'
import EyeIcon from '@/components/icons/EyeIcon'
import BaseInput from '../inputs/BaseInput'
import useInputChange from '@/hooks/useInputChange'

function RegisterForm() {
    const [[email, emailError], handleEmailChange, setEmail] = useInputChange(checkEmailWithoutConfirmation)
    const [[username, usernameError], handleUsernameChange, setUsername] = useInputChange(checkUsername)
    const [
        [
            emailConfirmation, 
            emailConfirmationError
        ], 
            handleEmailConfirmationChange, 
            setEmailConfirmation
        ] = useInputChange(checkEmailWithoutConfirmation)
    const [[password, passwordError], handlePasswordChange, setPassword] = useInputChange(checkPassword)
    const [canSeePassword, setCanSeePassword] = useState(false)
    const [saveData, setSaveData] = useState(false)

    const emailInputId = useId()
    const usernameInputId = useId()
    const emailConfirmationId = useId()
    const passwordInputId = useId()
    const saveDataId = useId()

    const handleCheckEmail = (value, isEmail = true) => {
        if (isEmail) {
            handleEmailChange(value)
            if (value !== emailConfirmation) {
                setEmail([value, 'Emails do not match'])
                setEmailConfirmation([emailConfirmation, 'Emails do not match'])
            } else {
                handleEmailConfirmationChange(emailConfirmation)
            }
        } else {
            handleEmailConfirmationChange(value)
            if (value !== email) {
                setEmail([email, 'Emails do not match'])
                setEmailConfirmation([value, 'Emails do not match'])
            } else {
                handleEmailChange(email)
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        register(
            email,
            emailConfirmation,
            password,
            username
        ).then(([exit, message, field]) => {
            if(!exit){
                const fields = field.split('/')
                fields.map(fieldName => {
                    if (fieldName=='email'){
                        setEmail([email,message])
                    }else if (fieldName=='emailConfirmation'){
                        setEmailConfirmation([emailConfirmation,message])
                    }else if (fieldName=='password'){
                        setPassword([password,message])
                    }else if (fieldName=='username'){
                        setUsername([username,message])
                    }
                })
            }
        })
    }

    return (
        <div className='nf-container'>
            <form className='nf-form' onSubmit={handleSubmit}>

                <div className='nf-title'>
                    <h2 className='nf-title-text'>
                        <strong>Register form</strong>
                    </h2>
                </div>

                <BaseInput 
                    inputId={usernameInputId}
                    labelMessage='Your username:'
                    inputPlaceholder='john_doe'
                    inputValue={username}
                    errorClasses='nf-error-text'
                    errorMessage={usernameError}
                    onChangeFunction={handleUsernameChange}
                    labelClasses='nf-text'
                    containerClasses='nf-email'
                />

                <BaseInput 
                    inputId={emailInputId}
                    labelMessage='Your email:'
                    inputPlaceholder='example@gmail.com'
                    inputValue={email}
                    errorClasses='nf-error-text'
                    errorMessage={emailError}
                    onChangeFunction={(value)=>{
                        handleCheckEmail(value)
                    }}
                    labelClasses='nf-text'
                    containerClasses='nf-email'
                />

                <BaseInput 
                    inputId={emailConfirmationId}
                    labelMessage='Confirm your email:'
                    inputPlaceholder='example@gmail.com'
                    inputValue={emailConfirmation}
                    errorClasses='nf-error-text'
                    errorMessage={emailConfirmationError}
                    onChangeFunction={(value)=>{
                        handleCheckEmail(value,false)
                    }}
                    labelClasses='nf-text'
                    containerClasses='nf-email'
                />

                <BaseInput 
                    inputId={passwordInputId}
                    labelMessage='Your password:'
                    inputPlaceholder='password123'
                    inputValue={password}
                    errorClasses='nf-error-text'
                    errorMessage={passwordError}
                    inputType={canSeePassword ? 'text' : 'password'}
                    onChangeFunction={handlePasswordChange}
                    labelClasses='nf-text'
                    containerClasses='nf-email'
                >
                    <button type='button' onClick={()=>setCanSeePassword(!canSeePassword)}>
                        {
                            canSeePassword ? <EyeIcon/> : <EyeSlashIcon/>
                        }
                    </button>
                </BaseInput>

                <BaseInput 
                    inputId={saveDataId}
                    labelMessage='Save your data (email and password):'
                    inputValue={saveData}
                    inputType='checkbox'
                    onClickFunction={(e) => {
                        setSaveData(e)
                    }}
                    labelClasses='nf-text'
                    containerClasses='nf-email'
                />

                <div className='nf-submit'>
                    <button className='nf-button' type="submit">
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm