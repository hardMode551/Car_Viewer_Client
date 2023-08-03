import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://car-viewer-server.onrender.com',
});

export default instance;
