import axios from '../axiosConfig';
import * as apiCalls from './ApiCalls';
describe('ApiCalls', ()=>{

    describe('signUp' , ()=>{
        it('calls /api/1.0/users', ()=>{
            const mockSignUp = jest.fn();
            axios.post = mockSignUp;
            apiCalls.signUp();

            const path = mockSignUp.mock.calls[0][0]; 
            expect(path).toBe('/api/1.0/users');
        })
    })
})