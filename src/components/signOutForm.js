import React from 'react';
import { signOut } from '../services/firebase-api';

export default () => (
    <button type="button" onClick={signOut}>
        Sign Out
    </button>
)