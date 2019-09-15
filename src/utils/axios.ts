import axios from 'axios';

const server = axios.create({
  withCredentials: true,
  responseType: 'json',
});

export default server;
