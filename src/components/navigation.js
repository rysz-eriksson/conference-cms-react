import React from 'react'
import MainPage from './mainPage';
import SignInPage from './signInPage';

const Navigation = ({ authUser }) => (
    <div>
        {authUser ? <MainPage /> : <SignInPage /> }
    </div>
)

export default Navigation;