import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import * as yup from 'yup';
import schema from '../Validation/registerSchema';
import { LoginContainer } from "../Styled/Container";
import { InputGroup, InputControl } from '../Styled/Input';
import { Spinner } from '../Styled/Spinner';
import { PrimaryButton, LinkButton } from '../Styled/Button';
import { ErrorSpan } from '../Styled/Span';
import background from "./Assets/login-background.png";

export function RegisterPage(props)
{
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [registering, setRegistering] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const { setLoggedUser } = props;

    const validate = (name, value) => 
    {
        if (name === "confirmPassword")
        {
            const passwordValue = inputs["password"];
            const confirmValue = value;

            if (passwordValue === confirmValue)
            {
                errors["confirmPassword"] = '';
            }
            else
            {
                errors["confirmPassword"] = 'Passwords must match';
            }
        }
        else
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
        }
    };

    function handleChange(e)
    {
        const { name, value } = e.target;
        validate(name, value);
        setInputs({ ...inputs, [name]: value });
    }

    async function handleSubmit(e)
    {
        e.preventDefault();

        setRegistering(true);

        // Wait for 2 seconds before continue (registration simulation)
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
                <h2>Register</h2>
                <form name="form" onSubmit={handleSubmit}>
                    <InputGroup>
                        <label>First Name</label>
                        <InputControl
                            type="text"
                            name="firstName"
                            value={inputs.firstName}
                            onChange={handleChange}
                            id="first-name-input"
                        />
                        {errors.firstName && <ErrorSpan>{errors.firstName}</ErrorSpan>}
                    </InputGroup>

                    <InputGroup>
                        <label>Last Name</label>
                        <InputControl
                            type="text"
                            name="lastName"
                            value={inputs.lastName}
                            onChange={handleChange}
                            id="last-name-input"
                        />
                        {errors.lastName && <ErrorSpan>{errors.lastName}</ErrorSpan>}
                    </InputGroup>

                    <InputGroup>
                        <label>Email</label>
                        <InputControl
                            type="text"
                            name="email"
                            value={inputs.email}
                            onChange={handleChange}
                            id="email-input"
                        />
                        {errors.email && <ErrorSpan>{errors.email}</ErrorSpan>}
                    </InputGroup>

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
                        <label>Confirm Password</label>
                        <InputControl
                            type="password"
                            name="confirmPassword"
                            value={inputs.confirmPassword}
                            onChange={handleChange}
                            id="confirm-password-input"
                        />
                        {errors.confirmPassword && <ErrorSpan>{errors.confirmPassword}</ErrorSpan>}
                    </InputGroup>

                    <InputGroup>
                        <PrimaryButton
                            disabled={disabled}>
                            {registering && <Spinner />}
                            Register
                        </PrimaryButton>
                        <LinkButton to="/login">Cancel</LinkButton>
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