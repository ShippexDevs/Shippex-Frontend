import axiosClient from "./axiosClient";

export function checkUsername(username) {
  return axiosClient.get(`/api/public/checkUsername/${username}`);
}

export function generateOtp(phoneNumber) {
  return axiosClient.post("/api/public/generateOtp", {
    phoneNumber,
  });
}

export function verifyOtp(phoneNumber, otp) {
  return axiosClient.post("/api/public/verifyOtp", {
    phoneNumber,
    otp,
  });
}

export function registerUser(data) {
  return axiosClient.post("/api/public/register", data);
}
export function loginUser(data) {
  return axiosClient.post(
    "/api/public/login",
    data
  );
}

// AppUser account recovery and passwordless login endpoints.
export function findAccountByUsername(username) {
  return axiosClient.post("/api/public/forget-password", { username });
}

export function findAccountByPhone(phoneNumber) {
  return axiosClient.post("/api/public/forget-password-by-phone", { phoneNumber });
}

export function generateOtpForUsername(username) {
  return axiosClient.post("/api/public/generate-otp-for-username", { username });
}

export function generateOtpForPhone(phoneNumber) {
  return axiosClient.post("/api/public/generate-otp-for-phone", { phoneNumber });
}

export function resetPasswordWithUsername(data) {
  return axiosClient.post("/api/public/verify-otp-to-reset", data);
}

export function resetPasswordWithPhone(data) {
  return axiosClient.post("/api/public/verify-otp-to-reset-by-phone", data);
}

export function loginWithPhoneOtp(data) {
  return axiosClient.post("/api/public/verify-otp-to-login", data);
}
export function getCurrentUser() {
  return axiosClient.get("/api/appUser/me");
}

const appUserMeFieldPaths = {
  name: "/api/appUser/me/name",
  email: "/api/appUser/me/email",
  designation: "/api/appUser/me/designation",
  shipName: "/api/appUser/me/ship-name",
  shipIMONumber: "/api/appUser/me/ship-imo-number",
  whatsappContactNo: "/api/appUser/me/whatsapp-contact-no",
};

export function updateAppUserMeField(field, data) {
  const path = appUserMeFieldPaths[field];
  if (!path) throw new Error(`Unsupported profile field: ${field}`);
  return axiosClient.patch(path, data);
}

export function changeAppUserPassword(data) {
  return axiosClient.patch("/api/appUser/me/password", data);
}
