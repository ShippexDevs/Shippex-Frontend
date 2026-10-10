import axiosClient from "../api/axiosClient";

export async function getCategories() {
  const response = await axiosClient.get("/api/categories");
  const data = response.data?.data ?? response.data;
  return Array.isArray(data) ? data : [];
}
