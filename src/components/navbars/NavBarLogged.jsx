import { useNavigate } from 'react-router-dom'
import React,{ useContext } from 'react'
import { AuthContext } from "@/contexts/Auth"
import '@/styles/NavBar.css'
import { logout } from '@/services/auth/logout'
import { toast } from 'react-toastify'

function NavBarLogged() {
    const { refreshToken, handleLogout, user } = useContext(AuthContext) 
    const navigate = useNavigate()
    return (
        <>
            <div className='nv-container'>
                <ul className='nv-ul'>
                    <li className='nv-li nv-title'
                        onClick={(e)=>navigate('/')}>
                        <a className='nv-a nv-a-title'>
                            <strong>
                                Fryt
                            </strong>
                        </a>
                    </li>
                    <div className='nv-signing'>
                        <li className='nv-li' 
                            onClick={(e)=>navigate('/')}>
                            <a className='nv-a' >
                                Home
                            </a>
                        </li>
                        <li className='nv-li' 
                            onClick={(e)=>navigate('/reset_password')}>
                            <a className='nv-a' >
                                Reset password
                            </a>
                        </li>
                        <li className='nv-li' 
                            onClick={(e)=>{
                                const toastId = toast('Loading...',{
                                    autoClose:false,
                                    position: 'bottom-center'
                                })
                                logout(refreshToken).then(
                                (..._) => {
                                    toast.dismiss(toastId)
                                    handleLogout()
                                    navigate('/')
                                }
                            )}}>
                            <a className='nv-a' >
                                Logout
                            </a>
                        </li>
                    </div>
                    <li className='nv-li'>
                        @{user.username}
                    </li>
                </ul>
            </div>
        </>
    )
}

export default NavBarLogged