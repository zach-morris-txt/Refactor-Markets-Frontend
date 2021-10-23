import styled from 'styled-components';
import { devices } from './MediaQueries';

// Make sure your styled components are capitalized so that React can recognize them as custom components.

export const Container = styled.div`
    border: 1px solid rgb(210, 210, 210);
    border-radius: 6px;
    box-shadow: 0px 1px 6px -2px rgb(128, 127, 127);
    padding: 16px;
    background-color: white;
    max-width: 98vw;
    margin: 0 auto;
`;

export const Form = styled.form`
    display: flex;
    align-items: baseline;

    @media ${devices.tablet} {
        flex-direction: column;
    }
`;

export const FormGroup = styled(Form)`
    padding: 0 24px 0 24px;
    display: flex;
    flex-direction: column;
`;

export const FormGroupSubmit = styled(FormGroup)`
    flex: 2;
    align-items: flex-start;
`;

export const FormGroupInputs = styled(FormGroup)`
    flex: 2;
`;

export const FormGroupCheckboxes = styled(FormGroup)`
    flex: 1;
`;

export const LoginContainer = styled.div`
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 60%;
    position:relative;
    width: 60%;
    padding-right: 20px;
    padding-left: 20px;
    margin-left: 20%;
    flex-direction: row;
    justify-content: center;
    padding-top: 25px;
    padding-bottom: 25px;
`;