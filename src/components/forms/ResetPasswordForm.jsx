import React, { useEffect, useState } from 'react'
import useInputChange from '@/hooks/useInputChange'
import { checkPassword } from '@/services/checkFields'
import { resetPassword } from '@/services/auth/resetPassword'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ResetPasswordForm() {
    const navigate = useNavigate()

    const oldPasswordId = useId()
    const newPasswordId = useId()
    const newPasswordConfirmationId = useId()

    const [[oldPassword, oldPasswordError], handleOldPasswordChange, setOldPassword] = useInputChange(checkPassword)
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
        resetPassword(
            oldPassword,
            newPassword,
            newPasswordConfirmation
        ).then(([exit, message, field]) => {
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
                toast('Password reset successfully')
                navigate('/')
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