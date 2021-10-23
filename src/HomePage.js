import React from 'react';
import styled from 'styled-components';
import marketplace from "./Assets/marketplace.jpg";

export function HomePage()
{
    const Wrapper = styled.div`
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        height: 100%;
    `;

    const Image = styled.img`
        width: 100%;
        height: 100%;
        object-fit: cover;
    `;

    return (
        <Wrapper>
            <Image src={marketplace} alt='marketplace photo' />
        </Wrapper>
    );
}