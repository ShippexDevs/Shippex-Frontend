import adminAxios from "./adminAxios";

function unwrap(response) {
  return response.data?.data ?? response.data;
}

export async function getAdminProducts(offset = 0, limit = 100) {
  const response = await adminAxios.get("/api/admin/products", {
    params: { offset, limit },
  });
  const products = unwrap(response);
  return Array.isArray(products) ? products : [];
}

export async function updateAdminProductStock(productId, stock) {
  const response = await adminAxios.patch(
    `/api/admin/products/${encodeURIComponent(productId)}/stock`,
    { stock }
  );
  return unwrap(response);
}

export async function updateAdminProductFeatured(productId, featured) {
  const response = await adminAxios.patch(
    `/api/admin/products/${encodeURIComponent(productId)}/featured`,
    { featured }
  );
  return unwrap(response);
}

export async function updateAdminProductActive(productId, active) {
  const response = await adminAxios.patch(
    `/api/admin/products/${encodeURIComponent(productId)}/active`,
    { active }
  );
  return unwrap(response);
}
