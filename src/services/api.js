import axios from "axios";
const api = axios.create({
    baseURL: "https://finca.isladigital.xyz/",
});
export default api;
