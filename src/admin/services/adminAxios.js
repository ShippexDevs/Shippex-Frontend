import axios from "axios";
import { API_BASE_URL } from "../../config/env.js";

import {
    clearAdminAuth,
    getAdminToken
} from "./tokenStorage.js";

const adminAxios = axios.create({

    baseURL: API_BASE_URL,

    headers: {
        "Content-Type": "application/json"
    }

});

adminAxios.interceptors.request.use(

    (config) => {

        const token = getAdminToken();

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
