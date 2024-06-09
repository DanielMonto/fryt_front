import React, { useEffect } from 'react'
import { register } from '@/services/auth/register'
import { useId, useState } from 'react'
import EyeSlashIcon from '@/components/icons/EyeSlashIcon'
import { checkEmailWithoutConfirmation, checkPassword, checkUsername } from '@/services/checkFields'
import EyeIcon from '@/components/icons/EyeIcon'
import BaseInput from '../inputs/BaseInput'
import useInputChange from '@/hooks/useInputChange'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CheckIcon from '../icons/CheckIcon'

function RegisterForm() {
    const navigate = useNavigate()

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
    const [loading, setLoading] = useState(false)
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
        if (loading) return null
        setLoading(true)
        const toastId = toast('Loading...',{
            autoClose: false,
        })
        register(
            email,
            emailConfirmation,
            password,
            username
        ).then(([exit, message, field]) => {
            toast.dismiss(toastId)
            if(!exit){
                const fields = field.split('/')
                fields.map(fieldName => {
                    if (fieldName=='email'){
                        setEmail([email,message])
                        setLoading(false)
                    }else if (fieldName=='emailConfirmation'){
                        setEmailConfirmation([emailConfirmation,message])
                        setLoading(false)
                    }else if (fieldName=='password'){
                        setPassword([password,message])
                        setLoading(false)
                    }else if (fieldName=='username'){
                        setUsername([username,message])
                        setLoading(false)
                    }
                })
            }else{
                if (saveData) {
                    window.localStorage.setItem('ffr-login-email', email)
                    window.localStorage.setItem('ffr-login-password', password)
                }else{
                    window.localStorage.removeItem('ffr-login-email')
                    window.localStorage.removeItem('ffr-login-password')
                }
                toast(
                    <div>
                        <h3 style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <CheckIcon/>
                            Registered successfully
                        </h3>
                        <p style={{padding:0,margin:0}}>
                            You must login now
                        </p>
                    </div>
                )
                navigate('/login')
            }
        })
    }

    useEffect(() => {
        setLoading(false)
    },[])

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
                    errorMessage={usernameError}
                    onChangeFunction={handleUsernameChange}
                />

                <BaseInput 
                    inputId={emailInputId}
                    labelMessage='Your email:'
                    inputPlaceholder='example@gmail.com'
                    inputValue={email}
                    errorMessage={emailError}
                    onChangeFunction={(value)=>{
                        handleCheckEmail(value)
                    }}
                />

                <BaseInput 
                    inputId={emailConfirmationId}
                    labelMessage='Confirm your email:'
                    inputPlaceholder='example@gmail.com'
                    inputValue={emailConfirmation}
                    errorMessage={emailConfirmationError}
                    onChangeFunction={(value)=>{
                        handleCheckEmail(value,false)
                    }}
                />

                <BaseInput 
                    inputId={passwordInputId}
                    labelMessage='Your password:'
                    inputPlaceholder='Password123'
                    inputValue={password}
                    errorMessage={passwordError}
                    inputType={canSeePassword ? 'text' : 'password'}
                    onChangeFunction={handlePasswordChange}
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
                />

                <div className='nf-submit'>
                    <button className={
                        loading ?
                        'nf-button nf-button-loading' :
                        'nf-button'} type="submit">
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm