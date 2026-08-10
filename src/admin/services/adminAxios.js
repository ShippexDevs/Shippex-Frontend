import axios from "axios";
import { clearAdminAuth } from "./tokenStorage.js";

const adminAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});

adminAxios.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem("adminAccessToken");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

adminAxios.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {

        if (error.response?.status === 401) {

            clearAdminAuth();

            /*
             * Avoid redirecting repeatedly if we're
             * already on the admin login page.
             */
            if (
                window.location.pathname !==
                "/admin/login"
            ) {
                window.location.href =
                    "/admin/login";
            }
        }

        return Promise.reject(error);
    }
);

export default adminAxios;