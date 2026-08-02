const TOKEN_KEY = "adminAccessToken";
const USERNAME_KEY = "adminUsername";
const ROLE_KEY = "adminRole";

export const saveAdminAuth = (response) => {
    localStorage.setItem(TOKEN_KEY, response.accessToken);
    localStorage.setItem(USERNAME_KEY, response.username);
    localStorage.setItem(ROLE_KEY, response.role);
};

export const clearAdminAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ROLE_KEY);
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