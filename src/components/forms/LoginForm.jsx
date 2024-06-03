import React, { useEffect } from 'react'
import { useId, useState } from 'react'
import EyeSlashIcon from '@/components/icons/EyeSlashIcon'
import EyeIcon from '@/components/icons/EyeIcon'
import { checkEmailWithoutConfirmation, checkPassword } from '@/services/checkFields'
import BaseInput from '../inputs/BaseInput'
import { useNavigate } from 'react-router-dom'
import useInputChange from '@/hooks/useInputChange'
import { login } from '../../services/auth/login'

function LoginForm() {

    const navigate = useNavigate()

    const [[email, emailError], handleEmailChange, setEmail] = useInputChange(checkEmailWithoutConfirmation)
    const [[password, passwordError], handlePasswordChange, setPassword] = useInputChange(checkPassword)
    const [canSeePassword, setCanSeePassword] = useState(false)
    const [saveData, setSaveData] = useState(false)

    const emailInputId = useId()
    const passwordInputId = useId()
    const saveDataId = useId()

    const handleSubmit = (event) => {
        event.preventDefault()
        login(
            email,
            password
        ).then(([exit, tokensOrMessage, field]) => {
            if (!exit){
                const fields = field.split('/')
                fields.map(fieldName => {
                    if (fieldName=='email'){
                        setEmail([email,tokensOrMessage])
                    }else if (fieldName=='password'){
                        setPassword([password,tokensOrMessage])
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
            }
        })
    }

    useEffect(() => {
        setEmail([window.localStorage.getItem('ffr-login-email')??'',''])
        setPassword([window.localStorage.getItem('ffr-login-password')??'',''])
    },[])

    return (
        <div className='nf-container'>
            <form className='nf-form' onSubmit={handleSubmit}>

                <div className='nf-title'>
                    <h2 className='nf-title-text'>
                        <strong>Log in form</strong>
                    </h2>
                </div>

                <BaseInput 
                    inputId={emailInputId}
                    labelMessage='Your email:'
                    inputPlaceholder='example@gmail.com'
                    inputValue={email}
                    errorClasses='nf-error-text'
                    errorMessage={emailError}
                    onChangeFunction={handleEmailChange}
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
                    <button 
                        type='button' 
                        className='nf-button' 
                        onClick={()=>setCanSeePassword(!canSeePassword)}
                    >
                        {
                            canSeePassword ? <EyeIcon/> : <EyeSlashIcon/>
                        }
                    </button>
                    <a className='nf-forget-password' onClick={(e) => {
                        navigate('/forgot_password')
                    }}>
                        Forgotten password?
                    </a>
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
                        Log in
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm