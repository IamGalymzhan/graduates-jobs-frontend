import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

axios.interceptors.request.use((config) => {

}, (error) => {
  alert("Request error");
  return Promise.reject(error);
});
export default axios;