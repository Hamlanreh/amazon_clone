import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://amazon-clone-mern-dev.herokuapp.com/api/v1/',
  withCredentials: true,
  //   headers: {
  //     Authorization: '<Your Auth Token>',
  //     Content-Type: 'application/json',
  //     timeout: 1000,
  //   }
});

export default instance;
