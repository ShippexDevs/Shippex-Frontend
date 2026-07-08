export function validateRegisterForm(formData) {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!formData.username.trim()) {
    errors.username = "Username is required.";
  }

  if (!formData.password) {
    errors.password = "Password is required.";
  } else if (formData.password.length < 8) {
    errors.password =
      "Password must be at least 8 characters.";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword =
      "Confirm your password.";
  } else if (
    formData.password !==
    formData.confirmPassword
  ) {
    errors.confirmPassword =
      "Passwords do not match.";
  }

  if (
    formData.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
  ) {
    errors.email = "Invalid email address.";
  }

  if (!formData.designation) {
    errors.designation =
      "Designation is required.";
  }

  if (!formData.shipIMONumber.trim()) {
    errors.shipIMONumber =
      "Ship IMO Number is required.";
  }

  if (!formData.shipName.trim()) {
    errors.shipName =
      "Ship Name is required.";
  }

  if (!formData.whatsappContactNo.trim()) {
    errors.whatsappContactNo =
      "WhatsApp number is required.";
  }

  return errors;
}