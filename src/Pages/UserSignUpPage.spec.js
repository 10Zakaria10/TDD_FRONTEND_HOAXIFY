import React from 'react';
import {render , fireEvent, waitForDomChange , waitForElement} from '@testing-library/react';
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
    describe('Interactions',() =>{
        const mockAsyncDelayed = (succes) => {
            return jest.fn().mockImplementation(() =>{
                return new Promise ( (resolve,reject ) => {
                    setTimeout(() =>{
                        succes ? resolve({}) : 
                        reject({
                            response : {data :  {}}
                        });
                    },300)
                } )
            })
        };
        
        const changeEvent = (content) => {
            return  {
                target : {
                    value : content
                }
            }
        };
        let button , displayNameInput,usernameInput,passwordInput,passwordRepeatInput;
        const setSubmitFormValues  = (props) => {
            
            const rendred= render(<UserSignUpPage {...props} />);
            const {container , queryByPlaceholderText} = rendred;

            displayNameInput = queryByPlaceholderText('Your display name');
            usernameInput = queryByPlaceholderText('Your username');
            passwordInput = queryByPlaceholderText('Your password');
            passwordRepeatInput = queryByPlaceholderText('Repeat your password');

            fireEvent.change(displayNameInput,changeEvent('my-display-name'));
            fireEvent.change(usernameInput,changeEvent('my-username'));
            fireEvent.change(passwordInput,changeEvent('P4ssword'));
            fireEvent.change(passwordRepeatInput,changeEvent('P4ssword'));

            button = container.querySelector('button');
            return rendred;
        }
        it('sets the display name value into state', () => {
            const {queryByPlaceholderText} =render(<UserSignUpPage/>);
            const displayNameInput = queryByPlaceholderText('Your display name');
            
            fireEvent.change(displayNameInput,changeEvent('my-display-name'));
            expect(displayNameInput).toHaveValue('my-display-name');
        });
        it('sets the username value into state', () => {
            const {queryByPlaceholderText} =render(<UserSignUpPage/>);
            const usernameInput = queryByPlaceholderText('Your username');

            fireEvent.change(usernameInput,changeEvent('my-username'));
            expect(usernameInput).toHaveValue('my-username');
        });
        it('sets the password  value into state', () => {
            const {queryByPlaceholderText} =render(<UserSignUpPage/>);
            const passwordInput = queryByPlaceholderText('Your password');

            fireEvent.change(passwordInput,changeEvent('P4ssword'));
            expect(passwordInput).toHaveValue('P4ssword');
        });
        it('sets the display name value into state', () => {
            const {queryByPlaceholderText} =render(<UserSignUpPage/>);
            const passwordRepeat = queryByPlaceholderText('Repeat your password');
           
            fireEvent.change(passwordRepeat,changeEvent('P4ssword'));
            expect(passwordRepeat).toHaveValue('P4ssword');
        });
        it('calls posts sign up when the fields are valid , and the action are provided in props', ()=> {
            const actions = {
                postSignUp : jest.fn().mockResolvedValueOnce({})
            }
            setSubmitFormValues({actions});
            fireEvent.click(button);
            expect(actions.postSignUp).toBeCalledTimes(1);
        });
        it('is not throwning exception when action are not provided in props', ()=> {
            setSubmitFormValues();
            expect( ()=> fireEvent.click(button) ).not.toThrow();
        });
        it('pass user body in parametre when fields are valid', ()=> {
            const actions = {
                postSignUp : jest.fn().mockResolvedValueOnce({})
            }
            setSubmitFormValues({actions});
            fireEvent.click(button);
            const expectedBody = {
                username : 'my-username',
                displayName : 'my-display-name',
                password : 'P4ssword'
            };

            expect(actions.postSignUp).toBeCalledWith(expectedBody);
        });
        it('disable sign up button when there is an ongoing api call', ()=> {
            const actions = {
                postSignUp : mockAsyncDelayed(true)
            }
            setSubmitFormValues({actions});
            fireEvent.click(button);
            fireEvent.click(button);

            expect(actions.postSignUp).toHaveBeenCalledTimes(1);
        });
        it('display a spinner when there is an ongoing api call', ()=> {
            const actions = {
                postSignUp : mockAsyncDelayed(true)
            }
            const {queryByText } =setSubmitFormValues({actions});
            fireEvent.click(button);
            const spinner = queryByText('Loading...');
            expect(spinner).toBeInTheDocument();
        });
        it('hide spinner after api call finished succesfully', async ()=> {
            const actions = {
                postSignUp : mockAsyncDelayed(true)
            }
            const {queryByText } =setSubmitFormValues({actions});
            fireEvent.click(button);
            await  waitForDomChange();
            const spinner = queryByText('Loading...');
            expect(spinner).not.toBeInTheDocument();
        });
        it('hide spinner after api call fails', async ()=> {
            const actions = {
                postSignUp : mockAsyncDelayed(false)
            }
            const {queryByText } =setSubmitFormValues({actions});
            fireEvent.click(button);
            await  waitForDomChange();
            const spinner = queryByText('Loading...');
            expect(spinner).not.toBeInTheDocument();
        });
        it('display validation error for displayName when error is received for the field', async ()=> {
            const actions = {
                postSignUp : jest.fn().mockRejectedValue({
                    response : {
                        data : {
                            validationErrors : {
                                displayName : 'Cannot be null'
                            }
                        }
                    }
                })
            }
            const {queryByText } =setSubmitFormValues({actions});
            fireEvent.click(button);
            const errorMsg = await  waitForElement(() => queryByText('Cannot be null'));
            expect(errorMsg).toBeInTheDocument();
        });
        it('Enable signUp button when password and reapeatPassword have same value',  ()=> {
            setSubmitFormValues();
            expect(button).not.toBeDisabled();
        });
        it('Disable signUp button when passwordRepeat doenst not match the password',  ()=> {
            setSubmitFormValues();
            fireEvent.change(passwordRepeatInput , changeEvent('P4sswordx') );
            expect(button).toBeDisabled();
        });
        it('Disable signUp button when passwordRepeat doenst not match the password when we change password',  ()=> {
            setSubmitFormValues();
            fireEvent.change(passwordInput , changeEvent('P4sswordx') );
            expect(button).toBeDisabled();
        });
        it('Display the error for passwordRepeat when Password in not equal to Repeat password',  ()=> {
            const {queryByText} =setSubmitFormValues();
            fireEvent.change(passwordRepeatInput , changeEvent('P4sswordx') );
            const errorMessage = queryByText('Does not match the password')
            expect(errorMessage).toBeInTheDocument();
        });
        it('Display the error for password message when Password in not equal to Repeat password',  ()=> {
            const {queryByText} =setSubmitFormValues();
            fireEvent.change(passwordInput , changeEvent('P4sswordx') );
            const errorMessage = queryByText('Does not match the password')
            expect(errorMessage).toBeInTheDocument();
        });
        it('Hide DisplayName Error Message Received From BackEnd When User Change The Field', async ()=> {
            const actions = {
                postSignUp : jest.fn().mockRejectedValue({
                    response : {
                        data : {
                            validationErrors : {
                                displayName : 'Cannot be null'
                            }
                        }
                    }
                })
            }
            const {queryByText} =setSubmitFormValues({actions});
            fireEvent.click(button);
            await  waitForElement(() => queryByText('Cannot be null'));
            fireEvent.change(displayNameInput , changeEvent('new-display-name') );
            const errorMessage = queryByText('Cannot be null')
            expect(errorMessage).not.toBeInTheDocument();
        });
        it('Hide Username Error Message Received From BackEnd When User Change The Field', async ()=> {
            const actions = {
                postSignUp : jest.fn().mockRejectedValue({
                    response : {
                        data : {
                            validationErrors : {
                                username : 'Cannot be null'
                            }
                        }
                    }
                })
            }
            const {queryByText} =setSubmitFormValues({actions});
            fireEvent.click(button);
            await  waitForElement(() => queryByText('Cannot be null'));
            fireEvent.change(usernameInput , changeEvent('new-username') );
            const errorMessage = queryByText('Cannot be null')
            expect(errorMessage).not.toBeInTheDocument();
        });
        it('Hide Password Error Message Received From BackEnd When User Change The Field', async ()=> {
            const actions = {
                postSignUp : jest.fn().mockRejectedValue({
                    response : {
                        data : {
                            validationErrors : {
                                password : 'Cannot be null'
                            }
                        }
                    }
                })
            }
            const {queryByText} =setSubmitFormValues({actions});
            fireEvent.click(button);
            await  waitForElement(() => queryByText('Cannot be null'));
            fireEvent.change(passwordInput , changeEvent('new-password') );
            const errorMessage = queryByText('Cannot be null')
            expect(errorMessage).not.toBeInTheDocument();
        });
    });
});