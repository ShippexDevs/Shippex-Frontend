import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCircle, Mail, Phone, BriefcaseBusiness, Ship, Hash, ShieldCheck,
  LogOut, Pencil, Check, X, KeyRound,
} from "lucide-react";
import toast from "react-hot-toast";

import MobileLayout from "../layouts/MobileLayout";
import { useAuth } from "../context/AuthContext";
import LogoutConfirmModal from "../components/common/LogoutConfirmModal";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { DESIGNATIONS } from "../components/auth/DesignationDropdown";
import CountryPhoneInput, { toInternationalPhone } from "../components/auth/CountryPhoneInput";
import { changeAppUserPassword, generateOtp, updateAppUserMeField } from "../api/authApi";

const editableFields = [
  { key: "name", label: "Name", icon: UserCircle },
  { key: "email", label: "Email", icon: Mail, type: "email" },
  { key: "whatsappContactNo", label: "WhatsApp", icon: Phone, type: "tel" },
  { key: "designation", label: "Designation", icon: BriefcaseBusiness },
  { key: "shipName", label: "Ship Name", icon: Ship },
  { key: "shipIMONumber", label: "IMO Number", icon: Hash },
];

function ProfilePage() {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [pendingEdit, setPendingEdit] = useState(null);
  const [value, setValue] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [saving, setSaving] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [password, setPassword] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordSaving, setPasswordSaving] = useState(false);

  if (!user) return null;

  const startEditing = (field) => {
    setEditing(field.key);
    if (field.key === "whatsappContactNo") {
      const storedPhone = user[field.key] || "";
      const code = ["+880", "+380", "+66", "+60", "+62", "+94", "+91", "+65", "+95", "+7", "+86"].find((item) => storedPhone.startsWith(item)) || "";
      setPhoneCountryCode(code);
      setValue(code ? storedPhone.slice(code.length).replace(/\D/g, "") : storedPhone);
    } else {
      setValue(user[field.key] || "");
    }
    setOtp("");
    setOtpSent(false);
  };

  const sendWhatsappOtp = async () => {
    const phoneNumber = toInternationalPhone(phoneCountryCode, value);
    if (!/^\+[1-9]\d{7,14}$/.test(phoneNumber)) return toast.error("Enter a valid WhatsApp number with country code.");
    setOtpSending(true);
    try {
      await generateOtp(phoneNumber);
      setOtpSent(true);
      toast.success("OTP sent successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send OTP.");
    } finally {
      setOtpSending(false);
    }
  };

  const saveField = async (event) => {
    event.preventDefault();
    const nextValue = editing === "whatsappContactNo" ? toInternationalPhone(phoneCountryCode, value) : value.trim();
    if (!nextValue) return toast.error(`${editableFields.find((field) => field.key === editing)?.label} is required.`);
    if (editing === "whatsappContactNo" && !/^\+[1-9]\d{7,14}$/.test(nextValue)) return toast.error("Enter a valid WhatsApp number with country code.");
    if (editing === "whatsappContactNo" && !otpSent) return toast.error("Send an OTP before updating your WhatsApp number.");
    if (editing === "whatsappContactNo" && !otp.trim()) return toast.error("Enter the OTP sent to your new number.");
    setSaving(true);
    try {
      const data = editing === "whatsappContactNo"
        ? { phoneNumber: nextValue, otp: otp.trim() }
        : editing === "email"
          ? { email: nextValue }
          : { value: nextValue };
      const response = await updateAppUserMeField(editing, data);
      const updatedUser = response.data?.data || response.data;
      setUser({ ...user, ...(updatedUser && typeof updatedUser === "object" ? updatedUser : {}), [editing]: nextValue });
      setEditing(null);
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const savePassword = async (event) => {
    event.preventDefault();
    if (!password.currentPassword || !password.newPassword || !password.confirmPassword) return toast.error("Please fill in all password fields.");
    if (password.newPassword.length < 8) return toast.error("Password must contain at least 8 characters.");
    if (password.newPassword !== password.confirmPassword) return toast.error("New password and confirmation do not match.");
    setPasswordSaving(true);
    try {
      const { currentPassword, newPassword } = password;
      await changeAppUserPassword({ currentPassword, newPassword });
      toast.success("Password changed successfully.");
      setPassword({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to change password.");
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <MobileLayout>
      <div className="mx-auto max-w-4xl px-4 py-6 pb-24 sm:px-6 lg:px-8">
        <div className="mb-7">
          <p className="text-sm font-medium text-[#087E8B]">Account</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#102A43] sm:text-3xl">My Profile</h1>
          <p className="mt-1.5 text-sm text-slate-500">View and update your account and ship details.</p>
        </div>

        <section className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
          <div className="rounded-t-2xl bg-[#14283D] px-5 py-6 text-white sm:px-6 sm:py-7">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold">{user.name?.charAt(0)?.toUpperCase() || "U"}</div>
              <div>
                <h2 className="text-xl font-bold">{user.name || "-"}</h2>
                <p className="mt-1 text-sm text-slate-300">@{user.username || "-"}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {editableFields.map((field) => (
              <ProfileField key={field.key} field={field} value={user[field.key]} editing={editing === field.key} draft={value} setDraft={setValue} phoneCountryCode={phoneCountryCode} setPhoneCountryCode={setPhoneCountryCode} saving={saving} otp={otp} setOtp={setOtp} otpSent={otpSent} otpSending={otpSending} onSendOtp={sendWhatsappOtp} onEdit={() => setPendingEdit(field)} onSave={saveField} onCancel={() => { setEditing(null); setOtp(""); setOtpSent(false); }} />
            ))}
            <ProfileField field={{ label: "Account Status", icon: ShieldCheck }} value={user.verified ? "Verified" : "Not Verified"} verified={user.verified} />
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-slate-800">Password</h2>
              <p className="mt-1 text-sm text-slate-500">Update your account password.</p>
            </div>
            <button type="button" onClick={() => setPasswordOpen((open) => !open)} className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <KeyRound size={16} /> {passwordOpen ? "Close" : "Change password"}
            </button>
          </div>
          {passwordOpen && (
            <form onSubmit={savePassword} className="mt-5 space-y-4 border-t border-slate-100 pt-5">
              {[ ["currentPassword", "Current password"], ["newPassword", "New password"], ["confirmPassword", "Confirm new password"] ].map(([key, label]) => (
                <label key={key} className="block text-sm font-medium text-slate-700">{label}
                  <input type="password" autoComplete={key === "currentPassword" ? "current-password" : "new-password"} value={password[key]} onChange={(event) => setPassword({ ...password, [key]: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/15" />
                </label>
              ))}
              <button type="submit" disabled={passwordSaving} className="rounded-lg bg-[#0A2342] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#123B63] disabled:opacity-60">{passwordSaving ? "Saving…" : "Update password"}</button>
            </form>
          )}
        </section>

        <button type="button" onClick={() => setLogoutModalOpen(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"><LogOut size={17} />Logout</button>
      </div>
      <ConfirmationModal
        open={Boolean(pendingEdit)}
        title={`Edit ${pendingEdit?.label ?? "profile field"}?`}
        message={`Continue to edit your ${pendingEdit?.label?.toLowerCase() ?? "profile information"}? You can review your changes before saving.`}
        confirmText="Continue to edit"
        confirmTone="primary"
        cancelText="Cancel"
        onConfirm={() => {
          const field = pendingEdit;
          setPendingEdit(null);
          if (field) startEditing(field);
        }}
        onCancel={() => setPendingEdit(null)}
      />
      <LogoutConfirmModal open={logoutModalOpen} onCancel={() => setLogoutModalOpen(false)} onConfirm={handleLogoutConfirm} />
    </MobileLayout>
  );
}

function ProfileField({ field, value, verified = false, editing = false, draft, setDraft, phoneCountryCode, setPhoneCountryCode, saving, otp, setOtp, otpSent, otpSending, onSendOtp, onEdit, onSave, onCancel }) {
  const Icon = field.icon;
  return (
    <div className="flex items-start gap-3 p-5">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${verified ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}><Icon size={17} /></div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{field.label}</p>
          {onEdit && !editing && <button type="button" aria-label={`Edit ${field.label}`} onClick={onEdit} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-[#087E8B]"><Pencil size={15} /></button>}
        </div>
        {editing ? (
          <form onSubmit={onSave} className="mt-2 space-y-2">
            {field.key === "whatsappContactNo" ? <CountryPhoneInput countryCode={phoneCountryCode} phoneNumber={draft} onCountryCodeChange={(code) => { setPhoneCountryCode(code); setDraft(""); }} onPhoneNumberChange={setDraft} /> : <div className="flex gap-2">
              {field.key === "designation" ? (
                <select autoFocus value={draft} onChange={(event) => setDraft(event.target.value)} className="min-w-0 flex-1 rounded-md border border-slate-200 bg-white px-2.5 py-2 text-sm outline-none focus:border-[#087E8B]">
                  <option value="" disabled>Select designation</option>
                  {DESIGNATIONS.map((designation) => <option key={designation} value={designation}>{designation.replaceAll("_", " ")}</option>)}
                </select>
              ) : (
                <input autoFocus type={field.type || "text"} value={draft} onChange={(event) => setDraft(event.target.value)} className="min-w-0 flex-1 rounded-md border border-slate-200 px-2.5 py-2 text-sm outline-none focus:border-[#087E8B]" />
              )}

            </div>}
            {field.key === "whatsappContactNo" && <div className="flex gap-2">
              <button type="button" onClick={onSendOtp} disabled={otpSending || saving} className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 disabled:opacity-50">{otpSending ? "Sending…" : otpSent ? "Resend OTP" : "Send OTP"}</button>
              <button type="submit" disabled={saving} aria-label="Save" className="rounded-md bg-emerald-50 p-2 text-emerald-700 disabled:opacity-50"><Check size={16} /></button>
              <button type="button" onClick={onCancel} aria-label="Cancel" className="rounded-md bg-slate-100 p-2 text-slate-600"><X size={16} /></button>
            </div>}
            {field.key !== "whatsappContactNo" && <div className="flex gap-2"><button type="submit" disabled={saving} aria-label="Save" className="rounded-md bg-emerald-50 p-2 text-emerald-700 disabled:opacity-50"><Check size={16} /></button><button type="button" onClick={onCancel} aria-label="Cancel" className="rounded-md bg-slate-100 p-2 text-slate-600"><X size={16} /></button></div>}
            {field.key === "whatsappContactNo" && otpSent && <input type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))} placeholder="Enter OTP" aria-label="OTP" className="w-full rounded-md border border-slate-200 px-2.5 py-2 text-sm outline-none focus:border-[#087E8B]" />}
          </form>
        ) : <p className="mt-1 break-words text-sm font-semibold text-slate-800">{field.key === "designation" ? value?.replaceAll("_", " ") || "-" : value || "-"}</p>}
      </div>
    </div>
  );
}

export default ProfilePage;
