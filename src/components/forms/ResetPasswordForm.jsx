import React, { useEffect, useId, useState } from 'react'
import useInputChange from '@/hooks/useInputChange'
import { checkPassword } from '@/services/checkFields'
import { resetPassword } from '@/services/auth/resetPassword'
import { useNavigate } from 'react-router-dom'
import BaseInput from '../inputs/BaseInput'
import { toast } from 'react-toastify'
import EyeSlashIcon from '@/components/icons/EyeSlashIcon'
import EyeIcon from '@/components/icons/EyeIcon'
import { useContext } from "react"
import { AuthContext } from "@/contexts/Auth"
import { logout } from '@/services/auth/logout'

function ResetPasswordForm() {
    const navigate = useNavigate()

    const { fetchJWT, handleLogout, refreshToken, user } = useContext(AuthContext)

    const oldPasswordId = useId()
    const newPasswordId = useId()
    const newPasswordConfirmationId = useId()

    const [[oldPassword, oldPasswordError], handleOldPasswordChange, setOldPassword] = useInputChange((value)=>[true,'do not need verification'])
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

    const [canSeePassword, setCanSeePassword] = useState(false)
    const [loading, setLoading] = useState(false)

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

    const handleSubmit = (event) => {
        event.preventDefault()
        if (loading) return null
        setLoading(true)
        const toastId = toast('Loading...',{
            autoClose:false,
            position: 'bottom-center'
        })
        resetPassword(
            oldPassword,
            newPassword,
            newPasswordConfirmation,
            fetchJWT
        ).then(([exit, message, field]) => {
            toast.dismiss(toastId)
            if (!exit){
                const fields = field.split('/')
                fields.map(fieldName => {
                    if (fieldName=='old_password'){
                        setOldPassword([oldPassword, message])
                        setLoading(false)
                    }else if (fieldName=='new_password'){
                        setNewPassword([newPassword, message])
                        setLoading(false)
                    }else if (fieldName=='new_password_confirmation'){
                        setNewPasswordConfirmation([newPasswordConfirmation, message])
                        setLoading(false)
                    }
                })
            }else{
                logout(refreshToken).then(
                    (..._) => {
                        handleLogout()
                        toast('Password reset successfully')
                        navigate('/')
                })
            }
        })
    }

    useEffect(() => {
        setLoading(false)
        if (user.is_guest) {
            toast('You are a guest so your password is 123',
                {
                    position: 'bottom-center'
                }
            )
            setOldPassword(['123',''])
        }
    },[])

    return (
        <div className='nf-container'>
            <form className='nf-form' onSubmit={handleSubmit}>

                <div className='nf-title'>
                    <h2 className='nf-title-text'>
                        <strong>Reset password</strong>
                    </h2>
                </div>

                <BaseInput 
                    inputId={oldPasswordId}
                    labelMessage='Your old password:'
                    inputPlaceholder='Password123'
                    inputValue={oldPassword}
                    errorMessage={oldPasswordError}
                    onChangeFunction={handleOldPasswordChange}
                />

                <BaseInput 
                    inputId={newPasswordId}
                    labelMessage='New password:'
                    inputPlaceholder='Password123'
                    inputType={canSeePassword ? 'text' : 'password'}
                    inputValue={newPassword}
                    errorMessage={newPasswordError}
                    onChangeFunction={handleCheckPassword}
                />

                <BaseInput 
                    inputId={newPasswordConfirmationId}
                    labelMessage='Confirm password:'
                    inputPlaceholder='Password123'
                    inputType={canSeePassword ? 'text' : 'password'}
                    inputValue={newPasswordConfirmation}
                    errorMessage={newPasswordConfirmationError}
                    onChangeFunction={(value) => {
                        handleCheckPassword(value,true)
                    }}>
                    <button 
                        type='button' 
                        className='nf-button' 
                        onClick={()=>setCanSeePassword(!canSeePassword)}
                    >
                        {
                            canSeePassword ? <EyeIcon/> : <EyeSlashIcon/>
                        }
                    </button>
                </BaseInput>

                <div className='nf-submit'>
                    <button className={
                        loading ?
                        'nf-button nf-button-loading' :
                        'nf-button'} type="submit">
                        Reset password
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ResetPasswordForm