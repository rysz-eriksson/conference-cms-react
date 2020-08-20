import React, { useState } from 'react'
import Alert from '@material-ui/lab/Alert'
import { loginUser } from '../services/firebase-api';

export default () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        loginUser(email, password)
            .catch((err) => {
                setError(err.message)
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }

    return (
        <div>
            <p>Login: jan@kowalski.pl</p>
            <p>Password: testing098</p>
            {error && <Alert severity='error'>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                />
                <button type='submit'>Sign In</button>
            </form>
        </div>
    )
}