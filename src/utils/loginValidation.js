export function validateLoginForm(formData) {

  const errors = {};

  if (!formData.username.trim()) {
    errors.username = "Username is required.";
  }

  if (!formData.password.trim()) {
    errors.password = "Password is required.";
  }

  return errors;

}