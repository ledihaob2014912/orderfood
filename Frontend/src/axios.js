import axios from "axios";

window.axios = axios;
axios.defaults.withCredentials = false;
axios.defaults.baseURL = "http://localhost:3000/api/contacts";
let backendUrl = "http://" + window.location.hostname.toString() + ":8081/api";
axios.defaults.baseURL = backendUrl;
