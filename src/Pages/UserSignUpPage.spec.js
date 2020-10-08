import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {UserSignUpPage} from './UserSignUpPage';

describe('UserSignUpPage',() => {
    describe('Layout', () => {
        it('has header of sign up', () => {
            const {container} = render(<UserSignUpPage/>);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign Up');
        });
        it('has input for display name' , () => {
            const {queryByPlaceholderText} = render(<UserSignUpPage/>);
            const displayNameInput = queryByPlaceholderText('Your display name');
            expect(displayNameInput).toBeInTheDocument();
        });
        it('has input for username' , () => {
            const {queryByPlaceholderText} = render(<UserSignUpPage/>);
            const usernameInput = queryByPlaceholderText('Your username');
            expect(usernameInput).toBeInTheDocument();
        });
        it('has input for passsword' , () => {
            const {queryByPlaceholderText} = render(<UserSignUpPage/>);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput).toBeInTheDocument();
        });
        it('has password type for passsword field' , () => {
            const {queryByPlaceholderText} = render(<UserSignUpPage/>);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput.type).toBe('password');
        });
        it('has input for repeat passsword' , () => {
            const {queryByPlaceholderText} = render(<UserSignUpPage/>);
            const passwordRepeat = queryByPlaceholderText('Repeat your password');
            expect(passwordRepeat).toBeInTheDocument();
        });
        it('has password type for repeat passsword field' , () => {
            const {queryByPlaceholderText} = render(<UserSignUpPage/>);
            const passwordRepeat = queryByPlaceholderText('Repeat your password');
            expect(passwordRepeat.type).toBe('password');
        });
        it('has submit button' , () => {
            const {container} = render(<UserSignUpPage/>);
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        });
    });
});