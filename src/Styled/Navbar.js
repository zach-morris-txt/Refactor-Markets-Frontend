import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Make sure your styled components are capitalized so that React can recognize them as custom components.

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    border-bottom: 1px solid #efefef;
    margin-bottom: 32px;
`;

export const NavHeader = styled.h1`
    color: #1c5d76;
`;

export const NavBrand = styled(Link)`
    flex-grow: 1;
    font-size: 24px;
    font-weight: 700;
    color: #333;
    text-decoration: none;
`;

export const NavItems = styled.ul`
    list-style: none;
    padding-inline-start: 0;
    display: flex;
    align-items: center;
`;

export const NavItem = styled(Link)`
    margin-right: 20px;
    cursor: pointer;
    transition: 250ms;
    cursor: pointer;
    color: #333;
    text-decoration: none;

    &:hover {
        transform: scale(1.05);
    }
`;

export const NavItemButton = styled(NavItem)`
    padding: 5px 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid #663399;
    /* add additional styled if primary*/
    ${(props) =>
        props.primary &&
        `   background-color: #663399;
            color: white;
        `}
`;