import { useState } from "react";

import InputField from "./InputField";
import PasswordField from "./PasswordField";
import DesignationDropdown from "./DesignationDropdown";
import PhoneNumberField from "./PhoneNumberField";

import { validateRegisterForm } from "../../utils/registerValidation";

import UsernameField from "./UsernameField";
import {
  checkUsernameAvailability,
  registerAppUser,
} from "../../features/auth/services/registerService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    designation: "",
    shipIMONumber: "",
    shipName: "",
    countryCode: "+91",
    whatsappContactNo: "",
  });

  const [errors, setErrors] = useState({});

  const [checkingUsername, setCheckingUsername] = useState(false);

  const [usernameAvailable, setUsernameAvailable] = useState(null);

  const [phoneVerified, setPhoneVerified] = useState(false);

  const [registering, setRegistering] = useState(false);

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    if (name === "username") {
      setUsernameAvailable(null);
    }

    if (
      name === "whatsappContactNo" ||
      name === "countryCode"
    ) {
      setPhoneVerified(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors =
      validateRegisterForm(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (usernameAvailable !== true) {
      toast.error("Please verify username.");
      return;
    }

    if (!phoneVerified) {
      toast.error("Please verify your WhatsApp number.");
      return;
    }

    setRegistering(true);

    const payload = {
      name: formData.name,
      username: formData.username,
      password: formData.password,
      email: formData.email,
      whatsappContactNo:
        `${formData.countryCode}${formData.whatsappContactNo}`,
      designation: formData.designation,
      shipIMONumber: formData.shipIMONumber,
      shipName: formData.shipName,
    };

    const result =
      await registerAppUser(payload);

    setRegistering(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    toast.success("Account created successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  }

  async function handleUsernameCheck() {
    if (!formData.username.trim()) {
      return;
    }

    setCheckingUsername(true);

    const result = await checkUsernameAvailability(
      formData.username
    );

    setCheckingUsername(false);

    setUsernameAvailable(result.available);

    if (!result.success) {
      setErrors((previous) => ({
        ...previous,
        username: result.message,
      }));
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Account Details */}

      <div className="rounded-3xl bg-white p-6 shadow-md">

        <h2 className="mb-6 text-xl font-bold">
          Account Details
        </h2>

        <div className="space-y-5">

          <InputField
            label="Full Name"
            name="name"
            required
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          <UsernameField
            value={formData.username}
            onChange={handleChange}
            onCheck={handleUsernameCheck}
            checking={checkingUsername}
            available={usernameAvailable}
            error={errors.username}
          />

          <PasswordField
            label="Password"
            name="password"
            required
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            required
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

        </div>

      </div>

      {/* Ship Details */}

      <div className="rounded-3xl bg-white p-6 shadow-md">

        <h2 className="mb-6 text-xl font-bold">
          Ship Details
        </h2>

        <div className="space-y-5">

          <DesignationDropdown
            value={formData.designation}
            onChange={handleChange}
            error={errors.designation}
          />

          <InputField
            label="Ship IMO Number"
            name="shipIMONumber"
            required
            placeholder="7 digit IMO number"
            value={formData.shipIMONumber}
            onChange={handleChange}
            error={errors.shipIMONumber}
          />

          <InputField
            label="Ship Name"
            name="shipName"
            required
            placeholder="Enter ship name"
            value={formData.shipName}
            onChange={handleChange}
            error={errors.shipName}
          />

        </div>

      </div>

      {/* WhatsApp Verification */}

      <div className="rounded-3xl bg-white p-6 shadow-md">

        <h2 className="mb-6 text-xl font-bold">
          WhatsApp Verification
        </h2>

        <PhoneNumberField
          countryCode={formData.countryCode}
          phoneNumber={formData.whatsappContactNo}
          onChange={handleChange}
          error={errors.whatsappContactNo}
          onVerified={setPhoneVerified}
        />

      </div>

      <button
        type="submit"
        disabled={
          registering ||
          !phoneVerified ||
          usernameAvailable !== true
        }
        className="
    w-full
    rounded-2xl
    bg-[#0A2342]
    py-4
    font-semibold
    text-white
    transition
    hover:bg-[#123B68]
    disabled:cursor-not-allowed
    disabled:bg-slate-400
    disabled:hover:bg-slate-400
  "
      >
        {registering ? "Registering..." : "Register"}
      </button>

    </form>
  );
}

export default RegisterForm;