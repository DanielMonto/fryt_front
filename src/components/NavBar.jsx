import { useNavigate } from 'react-router-dom'
import React from 'react'
import '@/styles/NavBar.css'

function NavBar() {
    const navigate = useNavigate()
    return (
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
                        onClick={(e)=>navigate('/login')}>
                        <a className='nv-a' >
                            Log in
                        </a>
                    </li>
                    <li className='nv-li' 
                        onClick={(e)=>navigate('/register')}>
                        <a className='nv-a' >
                            Register
                        </a>
                    </li>
                </div>
            </ul>
        </div>
    )
}

export default NavBar