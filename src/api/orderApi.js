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
      // Response was not JSON
    }

    throw new Error(errorMessage);
  }

  return response.json();
}