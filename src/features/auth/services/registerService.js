import {
  checkUsername,
  generateOtp,
  verifyOtp,
  registerUser,
} from "../../../api/authApi";

export async function checkUsernameAvailability(username) {
  try {
    await checkUsername(username);

    return {
      success: true,
      available: true,
      message: "Username available",
    };
  } catch (error) {
    if (error.response?.status === 410) {
      return {
        success: true,
        available: false,
        message: "Username already exists",
      };
    }

    return {
      success: false,
      available: false,
      message: "Unable to check username.",
    };
  }
}

export async function sendOtp(phoneNumber) {
  try {
    const response = await generateOtp(phoneNumber);

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ??
        "Unable to send OTP.",
    };
  }
}

export async function validateOtp(phoneNumber, otp) {
  try {
    const response = await verifyOtp(phoneNumber, otp);

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ??
        "OTP verification failed.",
    };
  }
}

export async function registerAppUser(formData) {
  try {
    const response = await registerUser(formData);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ??
        "Registration failed.",
    };
  }
}