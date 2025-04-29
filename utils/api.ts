import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000", // replace with your NestJS backend
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // for cookie-based auth
});
