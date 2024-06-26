import React from 'react'
import LoginForm from '@/components/forms/LoginForm'
import '@/styles/forms.css'
import NavBarUnlogged from '../navbars/NavBarUnlogged'


function LoginPage() {
    return (
        <>
            <NavBarUnlogged/>
            <LoginForm/>
        </>
    )
}

export default LoginPage