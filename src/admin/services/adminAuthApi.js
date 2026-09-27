import adminAxios from "./adminAxios";

export const loginAdmin = async (
    loginRequest
) => {

    const response = await adminAxios.post(
        "/api/admin/login",
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
