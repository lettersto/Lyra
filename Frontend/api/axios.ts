import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://k7c105.p.ssafy.io:8080/',
});

export default instance;
