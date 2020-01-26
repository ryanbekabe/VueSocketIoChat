import axios from 'axios';
import auth from "./auth.service";

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_NODE_SERVER,
});

httpClient.interceptors.request.use(request => {
  request.headers.Authorization = `Bearer ${auth.getToken()}`;

  return request;
});
httpClient.interceptors.response.use(response => {

  return response;
}, (error) => {
  if (401 === error.response.status) {
    auth.logout()
    return Promise.reject(error);
  } else {
    return Promise.reject(error);
  }
});

httpClient.getUsers = function () {
  return this.get('/users')
};
httpClient.getRooms = function () {
  return this.get('/rooms')
};


export default httpClient;
