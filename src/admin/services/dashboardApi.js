import axios from "axios";
import { API_BASE_URL } from "../../config/env";
import { getAdminToken } from "./tokenStorage";

const adminAxios = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

adminAxios.interceptors.request.use((config) => {
    const token = getAdminToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

const unwrap = (response) => {
    return response.data?.data ?? response.data;
};

export const getDashboardWidgets = async () => {
    const response = await adminAxios.get(
        "/api/admin/dashboard/widgets"
    );

    return unwrap(response);
};

export const getDashboardOverview = async (days = 30) => {
    const response = await adminAxios.get(
        "/api/admin/dashboard/overviewChart",
        {
            params: { days },
        }
    );

    return unwrap(response);
};

export const getRecentOrders = async (days = 30) => {
    const response = await adminAxios.get(
        "/api/admin/dashboard/orders",
        {
            params: { days },
        }
    );

    return unwrap(response);
};

export const getRecentActivity = async (days = 30) => {
    const response = await adminAxios.get(
        "/api/admin/dashboard/recentActivity",
        {
            params: { days },
        }
    );

    return unwrap(response);
};