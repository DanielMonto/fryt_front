import React from 'react'
import LoginForm from '@/components/forms/LoginForm'
import '@/styles/forms.css'
import NavBar from '../NavBar'


function LoginPage() {
    return (
        <>
            <NavBar/>
            <LoginForm/>
        </>
    )
}

export default LoginPage