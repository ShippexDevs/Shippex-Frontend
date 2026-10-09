import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Mail, ShieldCheck, Ship, UserPlus } from "lucide-react";
import adminAxios from "../services/adminAxios";
import { clearAdminAuth, getAdminUsername } from "../services/tokenStorage";

const initialForm = { name: "", username: "", email: "", whatsappContactNo: "", mfaEnabled: true };

export default function SuperAdminAdminsPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState(initialForm);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [created, setCreated] = useState(null);
    const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value }));

    async function submit(event) {
        event.preventDefault();
        setBusy(true); setError(""); setCreated(null);
        try {
            const response = await adminAxios.post("/api/admin", {
                name: form.name.trim(), username: form.username.trim(), email: form.email.trim(),
                whatsappContactNo: form.whatsappContactNo.trim() || null, mfaEnabled: form.mfaEnabled,
            });
            setCreated(response.data?.data || { username: form.username, message: response.data?.message });
            setForm(initialForm);
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Could not create the admin. Please try again.");
        } finally { setBusy(false); }
    }

    function logout() { clearAdminAuth(); navigate("/super-admin/login", { replace: true }); }

    return <main className="min-h-screen bg-[#f4f7f8] text-slate-900">
        <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#102b3b] text-white"><Ship size={20} /></span><div><p className="font-bold">Shippex</p><p className="text-[10px] font-semibold tracking-[.17em] text-slate-400">SUPER ADMIN CONSOLE</p></div></div><div className="flex items-center gap-4"><span className="hidden text-sm text-slate-500 sm:block">Signed in as <strong className="text-slate-700">{getAdminUsername() || "Super admin"}</strong></span><button onClick={logout} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Sign out</button></div></div></header>
        <div className="mx-auto max-w-6xl px-5 py-9 sm:px-8 sm:py-12">
            <button onClick={() => navigate("/admin/home")} className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800"><ArrowLeft size={16} />Admin dashboard</button>
            <div className="mb-8 flex items-start gap-4"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e5f3f2] text-[#087e8b]"><UserPlus size={23} /></div><div><p className="text-sm font-semibold text-[#087e8b]">TEAM ACCESS</p><h1 className="mt-1 text-3xl font-bold tracking-tight">Create an administrator</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Add a team member to Shippex. Their temporary sign-in credentials will be sent to their email address.</p></div></div>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                    <h2 className="text-lg font-bold">Administrator details</h2><p className="mt-1 text-sm text-slate-500">All fields except WhatsApp are required.</p>
                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
                        <Field label="Full name" name="name" value={form.name} onChange={update} placeholder="e.g. Asha Patel" autoComplete="name" />
                        <Field label="Username" name="username" value={form.username} onChange={update} placeholder="e.g. asha.patel" autoComplete="off" />
                        <Field label="Work email" name="email" type="email" value={form.email} onChange={update} placeholder="asha@company.com" autoComplete="email" />
                        <Field label="WhatsApp number" name="whatsappContactNo" type="tel" value={form.whatsappContactNo} onChange={update} placeholder="Optional" autoComplete="tel" required={false} />
                    </div>
                    <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4"><input type="checkbox" name="mfaEnabled" checked={form.mfaEnabled} onChange={update} className="mt-0.5 h-4 w-4 accent-[#087e8b]" /><span><span className="block text-sm font-semibold text-slate-800">Enable multi-factor authentication</span><span className="mt-1 block text-xs leading-5 text-slate-500">Recommended for administrator accounts.</span></span></label>
                    {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
                    {created && <div role="status" className="mt-5 flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800"><Check size={19} className="mt-0.5 shrink-0" /><div><p className="text-sm font-semibold">Administrator created</p><p className="mt-1 text-sm">{created.message || `Credentials have been sent to ${form.email || "the registered email"}.`}</p>{created.username && <p className="mt-2 text-xs">Username: <strong>{created.username}</strong></p>}</div></div>}
                    <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end"><button type="button" onClick={() => { setForm(initialForm); setError(""); setCreated(null); }} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">Clear form</button><button disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#087e8b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#066b76] disabled:cursor-wait disabled:opacity-60"><UserPlus size={17} />{busy ? "Creating…" : "Create administrator"}</button></div>
                </form>
                <aside className="h-fit rounded-2xl bg-[#102b3b] p-6 text-white"><div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#f0b35d]"><ShieldCheck size={21} /></div><h2 className="mt-5 text-lg font-bold">Account security</h2><p className="mt-2 text-sm leading-6 text-white/65">Shippex generates a temporary password and emails it to the new administrator. They will be asked to change it after their first sign-in.</p><div className="mt-6 flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4"><Mail size={17} className="mt-0.5 shrink-0 text-[#f0b35d]" /><p className="text-xs leading-5 text-white/70">Double-check the email address. Login credentials are delivered there automatically.</p></div></aside>
            </div>
        </div>
    </main>;
}

function Field({ label, name, value, onChange, type = "text", placeholder, autoComplete, required = true }) {
    return <label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">{label}{required && <span className="text-red-500"> *</span>}</span><input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} required={required} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#087e8b] focus:ring-4 focus:ring-[#087e8b]/10" /></label>;
}
