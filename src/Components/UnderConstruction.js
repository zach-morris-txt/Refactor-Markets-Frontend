import React from 'react';
import styled from 'styled-components';
import underConstruction from '../Assets/under-construction.jpg';

export default function UnderConstruction()
{
    const Wrapper = styled.div`
        display: inline-flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        height: 50vh;
        width: 50vw;
    `;

    const Image = styled.img`
        width: 100%;
        height: 100%;
        object-fit: cover;
    `;

    return (
        <Wrapper>
            <Image src={underConstruction} alt='page under construction' />
        </Wrapper>
    );
};

