import React from 'react'
import '@/styles/asides/FriendsActivesAside.css'

function FriendsActivesAside() {
    return (
        <aside className='faa-container'>
            <h2>
                Friends
            </h2>
            <ul className="faa-ul">
                <li className="faa-li">
                    <a href="#" className='faa-a'>
                        Friend 1
                    </a>
                </li>
                <li className="faa-li">
                    <a href="#" className='faa-a'>
                        Friend 2
                    </a>
                </li>
                <li className="faa-li">
                    <a href="#" className='faa-a'>
                        Friend 3
                    </a>
                </li>
                <li className="faa-li">
                    <a href="#" className='faa-a'>
                        Friend 4
                    </a>
                </li>
                <li className="faa-li">
                    <a href="#" className='faa-a'>
                        Friend 5
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default FriendsActivesAside