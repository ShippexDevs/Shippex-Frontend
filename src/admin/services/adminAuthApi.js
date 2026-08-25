import axios from "axios";
import adminAxios from "./adminAxios";

const BASE_URL =
    "http://localhost:8080/api/admin";

export const loginAdmin = async (
    loginRequest
) => {

    const response = await axios.post(
        `${BASE_URL}/login`,
        loginRequest
    );

    return response.data;
};

export const changeAdminPassword = async (
    passwordData
) => {

    const response = await adminAxios.post(
        "/api/admin/auth/change-password",
        passwordData
    );

    return response.data;
};