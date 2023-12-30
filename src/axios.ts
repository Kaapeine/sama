import axios, { Axios } from "axios";

export const mbdb = axios.create({
  baseURL: "http://localhost:5000/ws/2",
});
