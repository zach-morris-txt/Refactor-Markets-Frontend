import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import * as yup from 'yup';
import schema from '../Validation/loginSchema';
import { LoginContainer } from "../Styled/Container";
import { InputGroup, InputControl } from '../Styled/Input';
import { Spinner } from '../Styled/Spinner';
import { PrimaryButton, LinkButton } from '../Styled/Button';
import { ErrorSpan } from '../Styled/Span';
import background from "./Assets/login-background.png";

export function LoginPage(props)
{
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });

    const [loggingIn, setLoggingIn] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const { setLoggedUser } = props;

    const validate = (name, value) => 
    {
        yup.reach(schema, name)
            .validate(value)
            .then(() => 
            {
                setErrors({ ...errors, [name]: '' });
            })
            .catch(err => 
            {
                setErrors({ ...errors, [name]: err.errors[0] });
            });
    };

    function handleChange(e)
    {
        const { name, value } = e.target;
        validate(name, value);
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    async function handleSubmit(e)
    {
        e.preventDefault();
        setLoggingIn(true);

        // Wait for 2 seconds before continue (login simulation)
        const delay = (n) => new Promise(r => setTimeout(r, n * 1000));
        await delay(2);

        setLoggedUser(inputs.username);
    }

    useEffect(() =>
    {
        schema.isValid(inputs)
            .then(valid => setDisabled(!valid));
    }, [inputs]);

    return (
        <Body>
            <LoginContainer>
                <h2>Login</h2>
                <form name="form" onSubmit={handleSubmit}>
                    <InputGroup>
                        <label>Username</label>
                        <InputControl
                            type="text"
                            name="username"
                            value={inputs.username}
                            onChange={handleChange}
                            id="username-input"
                        />
                        {errors.username && <ErrorSpan>{errors.username}</ErrorSpan>}
                    </InputGroup>

                    <InputGroup>
                        <label>Password</label>
                        <InputControl
                            type="password"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                            id="password-input"
                        />
                        {errors.password && <ErrorSpan>{errors.password}</ErrorSpan>}
                    </InputGroup>

                    <InputGroup>
                        <PrimaryButton
                            disabled={disabled}>
                            {loggingIn && <Spinner />}
                            Login
                        </PrimaryButton>
                        <LinkButton to="/register" >Register</LinkButton>
                    </InputGroup>
                </form>
            </LoginContainer>
        </Body>
    );
};

const Body = styled.body`
    background-image: url(${background});
    background-size: cover;
    justify-content: center;
    font-family: "Raleway", sans-serif;
    height: 100%;
    width: 100%;
`;