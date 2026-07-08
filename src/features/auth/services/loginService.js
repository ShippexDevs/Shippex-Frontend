import { loginUser } from "../../../api/authApi";
import { getCurrentUser } from "../../../api/authApi";

export async function login(formData) {

  try {

    const response = await loginUser(formData);

    return {
      success: true,
      data: response.data.data,
    };

  } catch (error) {

    return {

      success: false,

      message:
        error.response?.data?.message ??
        "Unable to login.",

    };

  }

}

export async function fetchCurrentUser() {

  try {

    const response = await getCurrentUser();

    return {
      success: true,
      data: response.data.data,
    };

  } catch (error) {

    return {
      success: false,
      message:
        error.response?.data?.message ??
        "Unable to fetch user.",
    };

  }

}