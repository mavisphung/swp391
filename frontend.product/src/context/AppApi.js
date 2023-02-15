// const { default: axios } = require("axios");
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7179/api",
});

export default api;
