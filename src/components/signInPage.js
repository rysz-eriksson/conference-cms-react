import React, { useState } from 'react'
import Alert from '@material-ui/lab/Alert'
import styled from 'styled-components';
import { Form, FormRow, Button } from './submitForm'
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
            <Paragraph>Login: jan@kowalski.pl</Paragraph>
            <Paragraph>Password: testing098</Paragraph>
            {error && <Alert severity='error'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <FormColumn>
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        value={email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Type e-mail address"
                    />
                </FormColumn>
                <FormColumn>
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        value={password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Type password"
                    />
                </FormColumn>
                <Button type='submit'>Sign In</Button>
            </Form>
        </div>
    )
}

const Paragraph = styled.p`
    margin-top: 5px;
    text-align: center;
    font-size: 20px;
`

const FormColumn = styled(FormRow)`
    flex-direction: column
`