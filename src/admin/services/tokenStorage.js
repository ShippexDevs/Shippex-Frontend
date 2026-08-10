const TOKEN_KEY = "adminAccessToken";
const USERNAME_KEY = "adminUsername";
const ROLE_KEY = "adminRole";
const FIRST_LOGIN_KEY = "adminFirstLogin";

export const saveAdminAuth = (response) => {

    localStorage.setItem(
        TOKEN_KEY,
        response.accessToken
    );

    localStorage.setItem(
        USERNAME_KEY,
        response.username
    );

    localStorage.setItem(
        ROLE_KEY,
        response.role
    );

    localStorage.setItem(
        FIRST_LOGIN_KEY,
        String(response.firstLogin)
    );
};

export const getAdminToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const getAdminUsername = () => {
    return localStorage.getItem(USERNAME_KEY);
};

export const getAdminRole = () => {
    return localStorage.getItem(ROLE_KEY);
};

export const isAdminFirstLogin = () => {
    return localStorage.getItem(FIRST_LOGIN_KEY) === "true";
};

export const clearAdminAuth = () => {

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(FIRST_LOGIN_KEY);
};