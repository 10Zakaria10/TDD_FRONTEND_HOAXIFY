import axios from '../axiosConfig';

export const signUp = (user) => {
    return axios.post('/api/1.0/users',user);
}