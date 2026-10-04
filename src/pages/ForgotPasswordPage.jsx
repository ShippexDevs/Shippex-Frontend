import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MobileLayout from "../layouts/MobileLayout";
import InputField from "../components/auth/InputField";
import CountryPhoneInput, { toInternationalPhone } from "../components/auth/CountryPhoneInput";
import PasswordField from "../components/auth/PasswordField";
import {
  findAccountByPhone,
  findAccountByUsername,
  generateOtpForPhone,
  generateOtpForUsername,
  resetPasswordWithPhone,
  resetPasswordWithUsername,
} from "../api/authApi";

function ForgotPasswordPage() {
  const [method, setMethod] = useState("username");
  const [identifier, setIdentifier] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState("lookup");
  const [maskedPhone, setMaskedPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isPhone = method === "phone";

  function chooseMethod(nextMethod) {
    setMethod(nextMethod);
    setIdentifier("");
    setCountryCode("+91");
    setOtp("");
    setStep("lookup");
    setMaskedPhone("");
  }

  async function handleLookup(event) {
    event.preventDefault();
    const value = isPhone ? toInternationalPhone(countryCode, identifier) : identifier.trim();
    if (!value) return toast.error(isPhone ? "Enter your WhatsApp number." : "Enter your username.");
    if (isPhone && !/^\+[1-9]\d{7,14}$/.test(value)) {
      return toast.error("Enter the full number with country code, for example +919876543210.");
    }
    setLoading(true);
    try {
      const response = isPhone ? await findAccountByPhone(value) : await findAccountByUsername(value);
      const resultData = response.data?.data ?? response.data;
      setMaskedPhone(resultData?.maskedPhoneNumber ?? resultData?.phoneNumber ?? resultData?.whatsappContactNo ?? "");
      setStep("ready");
    } catch (error) {
      toast.error(error.response?.data?.message ?? "We couldn't find an account with those details.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSendOtp() {
    setLoading(true);
    try {
      if (isPhone) await generateOtpForPhone(toInternationalPhone(countryCode, identifier));
      else await generateOtpForUsername(identifier.trim());
      setStep("reset");
      toast.success("OTP sent to your registered WhatsApp number.");
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Unable to send OTP.");
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(event) {
    event.preventDefault();
    if (!/^\d{6}$/.test(otp)) return toast.error("Enter the six-digit OTP.");
    if (newPassword.length < 8) return toast.error("Password must be at least 8 characters.");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match.");
    setLoading(true);
    try {
      const payload = { otp, newPassword, [isPhone ? "phoneNumber" : "username"]: isPhone ? toInternationalPhone(countryCode, identifier) : identifier.trim() };
      if (isPhone) await resetPasswordWithPhone(payload);
      else await resetPasswordWithUsername(payload);
      toast.success("Password reset. You can now sign in.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MobileLayout>
      <main className="min-h-screen bg-slate-50 px-5 py-8">
        <div className="mx-auto max-w-md">
          <header className="mb-7 text-center">
            <h1 className="text-3xl font-bold text-[#0A2342]">Reset your password</h1>
            <p className="mt-2 text-slate-600">Recover your account using your username or WhatsApp number.</p>
          </header>
          <section className="space-y-5 rounded-3xl bg-white p-6 shadow-md">
            <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1">
              {[ ["username", "I know my username"], ["phone", "Use phone number"] ].map(([value, label]) => (
                <button key={value} type="button" onClick={() => chooseMethod(value)} className={`rounded-lg px-2 py-2 text-sm font-semibold ${method === value ? "bg-white text-[#0A2342] shadow-sm" : "text-slate-500"}`}>{label}</button>
              ))}
            </div>

            {step === "lookup" && <form onSubmit={handleLookup} className="space-y-5">
              {isPhone ? <CountryPhoneInput countryCode={countryCode} phoneNumber={identifier} onCountryCodeChange={(value) => { setCountryCode(value); setIdentifier(""); }} onPhoneNumberChange={setIdentifier} /> : <InputField label="Username" name="identifier" required placeholder="Enter your username" value={identifier} onChange={(event) => setIdentifier(event.target.value)} />}
              <button disabled={loading} className="w-full rounded-2xl bg-[#0A2342] py-4 font-semibold text-white disabled:bg-slate-400">{loading ? "Checking…" : "Find account"}</button>
            </form>}

            {step === "ready" && <div className="space-y-5">
              <p className="text-sm text-slate-600">We found your account{maskedPhone ? <>. The registered WhatsApp number is <strong>{maskedPhone}</strong></> : ""}. Send a one-time code to continue.</p>
              <button type="button" onClick={handleSendOtp} disabled={loading} className="w-full rounded-2xl bg-[#0A2342] py-4 font-semibold text-white disabled:bg-slate-400">{loading ? "Sending…" : "Send WhatsApp OTP"}</button>
              <button type="button" onClick={() => setStep("lookup")} className="w-full text-sm font-medium text-slate-600">Use different details</button>
            </div>}

            {step === "reset" && <form onSubmit={handleReset} className="space-y-5">
              <p className="text-sm text-slate-600">Enter the six-digit code sent to your registered WhatsApp number.</p>
              <InputField label="OTP" name="otp" required type="text" placeholder="6-digit code" value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))} />
              <PasswordField label="New password" name="newPassword" required value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
              <PasswordField label="Confirm new password" name="confirmPassword" required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
              <button disabled={loading} className="w-full rounded-2xl bg-[#0A2342] py-4 font-semibold text-white disabled:bg-slate-400">{loading ? "Updating…" : "Reset password"}</button>
              <button type="button" onClick={handleSendOtp} disabled={loading} className="w-full text-sm font-medium text-[#0F6E8C]">Resend OTP</button>
            </form>}
            <p className="text-center text-sm text-slate-600"><Link to="/login" className="font-semibold text-[#0F6E8C]">Back to login</Link></p>
          </section>
        </div>
      </main>
    </MobileLayout>
  );
}

export default ForgotPasswordPage;
