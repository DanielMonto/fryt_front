import React, { useContext } from 'react';
import NavBar from '../NavBar';
import '@/styles/pages/HomePage.css';
import FunctionalitiesAside from '../asides/FunctionalitiesAside';
import HomeContent from '../contents/HomeContent';
import FriendsActivesAside from '../asides/FriendsActivesAside';
import { AuthContext } from '@/contexts/Auth';

export function HomePage() {
    const { user } = useContext(AuthContext)
    return (
        <>
            <NavBar/>
            <div className='hp-container'>
                <FunctionalitiesAside/>
                <HomeContent/>
                <FriendsActivesAside/>
            </div>
        </>
    );
}
