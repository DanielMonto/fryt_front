import React from 'react';
import NavBar from '../NavBar';
import '@/styles/pages/HomePage.css';

export function HomePage() {
    return (
        <>
            <NavBar/>
            <main className='hp-main'>
                <h1>
                    Hello from home page
                </h1>
            </main>
        </>
    );
}
