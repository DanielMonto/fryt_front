import { useNavigate } from 'react-router-dom'
import React from 'react'
import '@/styles/NavBar.css'
import { logout } from '@/services/auth/logout'

function NavBarLogged() {
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
                            onClick={(e)=>logout().then(
                                (..._) => {
                                    navigate('/')
                                }
                            )}>
                            <a className='nv-a' >
                                Logout
                            </a>
                        </li>
                    </div>
                </ul>
            </div>
        </>
    )
}

export default NavBarLogged