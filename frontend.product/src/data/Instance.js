import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7179/api",
});
export default instance;