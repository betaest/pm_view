import axios from 'axios';
import store from '@/store';

const server = axios.create({
  withCredentials: true,
  responseType: 'json',
});

export default server;
