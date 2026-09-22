const API_BASE_URL = "http://localhost:8080";

export async function createOrder(orderData) {
  const token = localStorage.getItem("shippex_token");

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    }
  );

  if (!response.ok) {
    let errorMessage = "Failed to create order.";

    try {
      const errorBody = await response.json();

      errorMessage =
        errorBody.message ||
        errorBody.error ||
        errorMessage;
    } catch {
      // Backend did not return JSON.
    }

    throw new Error(errorMessage);
  }

  return await response.json();
}

export async function getMyOrders() {
  const token = localStorage.getItem("shippex_token");

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/orders/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    let errorMessage = "Failed to retrieve orders.";

    try {
      const errorBody = await response.json();

      errorMessage =
        errorBody.message ||
        errorBody.error ||
        errorMessage;
    } catch {
      // Backend did not return JSON.
    }

    throw new Error(errorMessage);
  }

  return await response.json();
}