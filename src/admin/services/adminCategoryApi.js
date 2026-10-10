import adminAxios from "./adminAxios";

function unwrap(response) {
  return response.data?.data ?? response.data;
}

export async function getAdminCategories() {
  const response = await adminAxios.get("/api/admin/categories");
  const categories = unwrap(response);
  return Array.isArray(categories) ? categories : [];
}

export async function createAdminCategory(category) {
  const response = await adminAxios.post("/api/admin/categories", category);
  return unwrap(response);
}

export async function updateAdminCategory(id, category) {
  const response = await adminAxios.put(`/api/admin/categories/${encodeURIComponent(id)}`, category);
  return unwrap(response);
}

export async function updateAdminCategoryStatus(id, active) {
  const response = await adminAxios.patch(`/api/admin/categories/${encodeURIComponent(id)}/status`, { active });
  return unwrap(response);
}

export async function getAdminCategoryNextSku(id) {
  const response = await adminAxios.get(`/api/admin/categories/${encodeURIComponent(id)}/next-sku`);
  return unwrap(response);
}

export async function generateAdminProductTags(product) {
  const response = await adminAxios.post("/api/admin/products/generate-tags", product);
  return unwrap(response);
}
