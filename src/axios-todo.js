import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-project-1500052318332.firebaseio.com/'
});

export default instance;