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
export function getCurrentUser() {
  return axiosClient.get("/api/appUser/me");
}