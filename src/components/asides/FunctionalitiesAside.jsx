import React from 'react'
import '@/styles/asides/FunctionalitiesAside.css'

function FunctionalitiesAside() {
    return (
        <aside className='fta-container'>
            <ul className="fta-ul">
                <li className="fta-li">
                    <a href="#" className='fta-a'>
                        Functionality 1
                    </a>
                </li>
                <li className="fta-li">
                    <a href="#" className='fta-a'>
                        Functionality 2
                    </a>
                </li>
                <li className="fta-li">
                    <a href="#" className='fta-a'>
                        Functionality 3
                    </a>
                </li>
                <li className="fta-li">
                    <a href="#" className='fta-a'>
                        Functionality 4
                    </a>
                </li>
                <li className="fta-li">
                    <a href="#" className='fta-a'>
                        Functionality 5
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default FunctionalitiesAside