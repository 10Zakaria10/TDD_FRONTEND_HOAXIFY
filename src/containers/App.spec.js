import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import App from './App';

describe('App' , () => {
    const setup = (path) => {
        return  render(<MemoryRouter initialEntries={[path]} >
        <App/>
    </MemoryRouter>)
    }

    it('display homePage when url is /' , () => {
        const {queryByTestId} = setup("/");
        const homePage = queryByTestId('homepage');
        expect(homePage).toBeInTheDocument();
    });
    it('display LoginPage when url is /login' , () => {
        const {container} =  setup("/login");
        const loginPageHeader = container.querySelector('h1');
        expect(loginPageHeader).toHaveTextContent('Login');
    });
    it('displays only LoginPage when url is /login' , () => {
        const {queryByTestId} =  setup("/login");
        const homePage = queryByTestId('homepage');
        expect(homePage).not.toBeInTheDocument();
    });
    it('display signUpPage when url is /signUp' , () => {
        const {container} =  setup("/signUp");
        const signUpPageHeader = container.querySelector('h1');
        expect(signUpPageHeader).toHaveTextContent('Sign Up');
    });
    it('display userPage when url is different to / , /login , /signUp' , () => {
        const {queryByTestId} =  setup("/user1");
        const userPage = queryByTestId('userpage');
        expect(userPage).toBeInTheDocument();
    });
})