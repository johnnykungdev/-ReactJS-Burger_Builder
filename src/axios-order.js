import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-e2a46.firebaseio.com/'
});

export default instance;

