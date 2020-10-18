import React from 'react';
import {render ,fireEvent} from '@testing-library/react';
import Input from './Input';
import '@testing-library/jest-dom/extend-expect';


describe('Layout' , () => {
    it('has input element ', () => {
        const {container} =  render(<Input/>);
        const inputElement =  container.querySelector('input');
        expect(inputElement).toBeInTheDocument();
    });
    it('displays the label provided in props', () => {
        const {queryByText} =  render(<Input label = "Test label"/>);
        const labelElement =  queryByText('Test label');
        expect(labelElement).toBeInTheDocument();
    });
    it('text type in input when type is not provided in props', () => {
        const {container} =  render(<Input/>);
        const element =  container.querySelector('input');
        expect(element.type).toBe('text');
    });
    it('display the type provided in props', () => {
        const {container} =  render(<Input type = "password"/>);
        const element =  container.querySelector('input');
        expect(element.type).toBe('password');
    });
    it('displays the placeholder when provided in props', () => {
        const {container} =  render(<Input placeholder = "Test placeholder"/>);
        const placeholderElement =  container.querySelector('input');
        expect(placeholderElement.placeholder).toBe('Test placeholder');
    });
    it('has value for input when it is provided as prop', () => {
        const {container} =  render(<Input value = "Test value"/>);
        const element =  container.querySelector('input');
        expect(element.value).toBe('Test value');
    });
    it('has onChange callback when it is provided in prop', () => {
        const onChangeFunction = jest.fn();
        const {container} =  render(<Input onChange = {onChangeFunction}/>);
        const element =  container.querySelector('input');
        fireEvent.change(element,
            {
                target : {
                    value : 'new value '
                }
            });
        expect(onChangeFunction).toHaveBeenCalledTimes(1);

    });
    it('has default style when there is no validation error or success', () => {
        const {container} =  render(<Input/>);
        const element =  container.querySelector('input');
        expect(element.className).toBe('form-control');
    });
    it('has success style when hasError property is false', () => {
        const {container} =  render(<Input hasErrors = {false} />);
        const element =  container.querySelector('input');
        expect(element.className).toBe('form-control is-valid');
    });
    it('has error style when hasError property is true', () => {
        const {container} =  render(<Input hasErrors = {true} />);
        const element =  container.querySelector('input');
        expect(element.className).toBe('form-control is-invalid');
    });
    it('display the error text when it is provided in props', () => {
        const {queryByText} =  render(<Input hasErrors = {true} error= 'Cannot be null' />);
        const errorElement =  queryByText('Cannot be null');
        expect(errorElement).toBeInTheDocument();
    });
    it('does not display the error text hadErrors is false or dosent exist ', () => {
        const {queryByText} =  render(<Input  error= 'Cannot be null' />);
        const errorElement =  queryByText('Cannot be null');
        expect(errorElement).not.toBeInTheDocument();
    });
    

});