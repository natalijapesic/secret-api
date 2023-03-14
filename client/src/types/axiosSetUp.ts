import axios from "axios";
import config from "./app.config.json";

axios.defaults.baseURL = `${config.server}`;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";

export default axios;
