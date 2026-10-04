import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import CountryPhoneInput, { toInternationalPhone } from "./CountryPhoneInput";
import { validateLoginForm } from "../../utils/loginValidation";
import { login } from "../../features/auth/services/loginService";
import { useAuth } from "../../context/AuthContext";
import { generateOtpForPhone, loginWithPhoneOtp } from "../../api/authApi";

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";
  const { login: authenticateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("password");
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  }

  async function finishLogin(data) {
    const authenticated = await authenticateUser(data.accessToken ?? data.bearerToken ?? data.token);
    if (!authenticated) return toast.error("Unable to restore your session.");
    toast.success(`Welcome back${data.name ? ` ${data.name}` : ""}!`);
    navigate(redirectTo, { replace: true });
  }

  async function handlePasswordLogin(event) {
    event.preventDefault();
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;
    setLoading(true);
    const result = await login(formData);
    setLoading(false);
    if (!result.success) return toast.error(result.message);
    await finishLogin(result.data);
  }

  async function handleSendOtp() {
    const phone = toInternationalPhone(countryCode, phoneNumber);
    if (!/^\+[1-9]\d{7,14}$/.test(phone)) return toast.error("Enter your full WhatsApp number with country code, e.g. +919876543210.");
    setLoading(true);
    try {
      await generateOtpForPhone(phone);
      setOtpSent(true);
      toast.success("OTP sent to your WhatsApp number.");
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Unable to send OTP.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOtpLogin(event) {
    event.preventDefault();
    if (!/^\d{6}$/.test(otp)) return toast.error("Enter the six-digit OTP.");
    setLoading(true);
    try {
      const response = await loginWithPhoneOtp({ phoneNumber: toInternationalPhone(countryCode, phoneNumber), otp });
      await finishLogin(response.data?.data ?? response.data);
    } catch (error) {
      toast.error(error.response?.data?.message ?? "OTP login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5 rounded-3xl bg-white p-6 shadow-md">
      <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1">
        <button type="button" onClick={() => setMode("password")} className={`rounded-lg py-2 text-sm font-semibold ${mode === "password" ? "bg-white text-[#0A2342] shadow-sm" : "text-slate-500"}`}>Password</button>
        <button type="button" onClick={() => setMode("otp")} className={`rounded-lg py-2 text-sm font-semibold ${mode === "otp" ? "bg-white text-[#0A2342] shadow-sm" : "text-slate-500"}`}>WhatsApp OTP</button>
      </div>

      {mode === "password" ? <form onSubmit={handlePasswordLogin} className="space-y-5">
        <InputField label="Username" name="username" required value={formData.username} onChange={handleChange} error={errors.username} />
        <PasswordField label="Password" name="password" required value={formData.password} onChange={handleChange} error={errors.password} />
        <p className="-mt-2 text-right"><Link to="/forgot-password" className="text-sm font-semibold text-[#0F6E8C]">Forgot password?</Link></p>
        <button type="submit" disabled={loading} className="w-full rounded-2xl bg-[#0A2342] py-4 font-semibold text-white disabled:bg-slate-400">{loading ? "Signing In…" : "Login"}</button>
      </form> : <form onSubmit={handleOtpLogin} className="space-y-5">
        <CountryPhoneInput countryCode={countryCode} phoneNumber={phoneNumber} onCountryCodeChange={(value) => { setCountryCode(value); setPhoneNumber(""); setOtpSent(false); setOtp(""); }} onPhoneNumberChange={(value) => { setPhoneNumber(value); setOtpSent(false); setOtp(""); }} />
        {otpSent && <InputField label="OTP" name="otp" required type="text" placeholder="6-digit code" value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))} />}
        {!otpSent ? <button type="button" disabled={loading} onClick={handleSendOtp} className="w-full rounded-2xl bg-[#0A2342] py-4 font-semibold text-white disabled:bg-slate-400">{loading ? "Sending…" : "Send OTP"}</button> : <>
          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-[#0A2342] py-4 font-semibold text-white disabled:bg-slate-400">{loading ? "Signing In…" : "Login with OTP"}</button>
          <button type="button" disabled={loading} onClick={handleSendOtp} className="w-full text-sm font-medium text-[#0F6E8C]">Resend OTP</button>
        </>}
      </form>}

      <p className="text-center text-sm text-slate-600">Don't have an account? <Link to="/register" className="font-semibold text-[#0F6E8C]">Register</Link></p>
    </div>
  );
}

export default LoginForm;
