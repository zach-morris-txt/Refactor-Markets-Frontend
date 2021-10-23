import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = styled.button`
    display:inline-block;
    font-weight: 400;
    color:#212529;
    text-align:center;
    vertical-align:middle;
    cursor:pointer;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    background-color:transparent;
    border: 1px solid transparent;
    padding:.375rem .75rem;
    font-size: 1rem;
    height: 2.5rem;
    width: auto;
    line-height: 1.5;
    border-radius:.25rem;
    transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;

    @media (prefers-reduced-motion:reduce) {
        transition:none;
    }

    &:hover {
        color:#212529;
        text-decoration:none;
    }

    &:focus {
        outline: 0;
        box-shadow: 0 0 0 .2rem rgba(0, 123, 255,.25)
    }

    &:disabled {
        opacity:.65;
        cursor: initial;
    }
`;

export const PrimaryButton = styled(Button)`
    color:#fff;
    background-color:#007bff;
    border-color:#007bff;

    &:hover {
        color:#fff;
        background-color:#0069d9;
        border-color:#0062cc;
    }

    &:focus {
        color:#fff;
        background-color:#0069d9;
        border-color:#0062cc;
        box-shadow: 0 0 0 .2rem rgba(38, 143, 255,.5);
    }

    &:disabled {
        color:#fff;
        background-color:#007bff;
        border-color:#007bff;
    }
`;

export const LinkButton = styled(Link)`
    display:inline-block;
    border: 1px solid transparent;
    padding:.375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    color:#007bff;
    text-decoration:none;

    &:hover {
        color:#0056b3;
        text-decoration:underline;
    }

    &:focus {
        text-decoration:underline;
        box-shadow:none;
    }

    &:disabled {
        color:#6c757d;
        pointer-events:none
    }
`;