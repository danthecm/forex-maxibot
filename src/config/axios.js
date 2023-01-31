import axios from "axios";
import { BASE_URL } from ".";

export default axios.create({
    baseURL: BASE_URL
})