import axios from "axios";

const BASE_URL = "http://localhost:8080/api/admin";

export const loginAdmin = async (loginRequest) => {

    const response = await axios.post(
        `${BASE_URL}/login`,
        loginRequest
    );

    return response.data;

};

export const changeAdminPassword = async (passwordData, token) => {

    const response = await axios.post(
        `${BASE_URL}/auth/change-password`,
        passwordData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};