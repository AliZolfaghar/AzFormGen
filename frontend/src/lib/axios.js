import axios from "axios";
import { replace } from "svelte-spa-router";

// change base url based on environment
const hostname = window.location.hostname;
let baseURL = "/api";
if (hostname === "localhost" || hostname === "127.0.0.1") {
    baseURL = "http://localhost/api";
}

const axiosInstance = axios.create({
    baseURL: baseURL, 
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});

// set token in request headers
axiosInstance.interceptors.request.use((config) => {    
    const authToken = localStorage.getItem("authToken");
    if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
    return config;
});

// redirect to /login on 401
axiosInstance.interceptors.response.use(
    (response) => response , // return response 
    (error) => {
        console.error("API error:", error);

        // handle error.401
        if (error.status == 401 || error.response.status == 401 ) {
            localStorage.removeItem("authToken");
            return replace("/login");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
