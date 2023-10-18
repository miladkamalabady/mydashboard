// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: 'https://myssl.medu.ir/api'
    // baseURL: 'http://192.168.0.231:5000/api'
});

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';


export default instance;