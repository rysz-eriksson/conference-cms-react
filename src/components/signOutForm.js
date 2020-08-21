import React from 'react';
import { Button } from './submitForm'
import { signOut } from '../services/firebase-api';
import styled from 'styled-components';

export default () => (
    <SignButton type="button" onClick={signOut}>
        Sign Out
    </SignButton>
)

export const SignButton = styled(Button)`
    display: block;
    margin: 0 auto 20px auto;
`