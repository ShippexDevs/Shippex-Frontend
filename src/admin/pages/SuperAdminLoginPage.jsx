import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound, ShieldCheck, Ship } from "lucide-react";
import { loginAdmin } from "../services/adminAuthApi";
import { getAdminRole, getAdminToken, normalizeAdminRole, saveAdminAuth } from "../services/tokenStorage";
import PasswordInput from "../components/PasswordInput";

export default function SuperAdminLoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (getAdminToken() && normalizeAdminRole(getAdminRole()) === "SUPER_ADMIN") navigate("/super-admin/admins", { replace: true });
    }, [navigate]);

    async function submit(event) {
        event.preventDefault();
        setError("");
        setBusy(true);
        try {
            const response = await loginAdmin({ username: username.trim(), password });
            if (normalizeAdminRole(response.role) !== "SUPER_ADMIN") {
                setError("This sign-in is for super admins. Use the admin sign-in instead.");
                return;
            }
            saveAdminAuth(response);
            navigate("/super-admin/admins", { replace: true });
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Unable to sign in. Check your credentials and try again.");
        } finally {
            setBusy(false);
        }
    }

    return <main className="grid min-h-screen bg-[#f4f7f8] lg:grid-cols-[1.05fr_.95fr]">
        <section className="relative hidden overflow-hidden bg-[#102b3b] p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-28 -top-24 h-96 w-96 rounded-full border border-white/10" />
            <div className="absolute -bottom-44 -left-24 h-[34rem] w-[34rem] rounded-full border border-white/10" />
            <div className="relative flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f0b35d] text-[#102b3b]"><Ship size={22} /></span><div><p className="font-bold">Shippex</p><p className="text-xs tracking-[.2em] text-white/55">CONTROL CENTER</p></div></div>
            <div className="relative max-w-lg"><p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/75"><ShieldCheck size={15} /> SUPER ADMIN ACCESS</p><h1 className="text-5xl font-semibold leading-[1.12]">Manage your team with confidence.</h1><p className="mt-5 max-w-md leading-7 text-white/65">Create administrator accounts and keep your Shippex operation moving.</p></div>
            <p className="relative text-xs text-white/40">Authorized personnel only</p>
        </section>
        <section className="flex items-center justify-center px-5 py-12 sm:px-10">
            <div className="w-full max-w-md">
                <div className="mb-8 lg:hidden"><div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-[#102b3b] text-white"><Ship size={23} /></div><p className="text-xs font-bold tracking-[.2em] text-[#087e8b]">SHIPPEX CONTROL CENTER</p></div>
                <div className="mb-8"><div className="mb-5 hidden h-12 w-12 place-items-center rounded-2xl bg-[#e5f3f2] text-[#087e8b] lg:grid"><KeyRound size={22} /></div><p className="text-sm font-semibold text-[#087e8b]">SUPER ADMINISTRATOR</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Sign in to your account</h2><p className="mt-2 text-sm text-slate-500">Use your super admin credentials to continue.</p></div>
                <form onSubmit={submit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">Username</span><input autoComplete="username" required value={username} onChange={event => setUsername(event.target.value)} placeholder="Your username" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#087e8b] focus:ring-4 focus:ring-[#087e8b]/10" /></label>
                    <label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">Password</span><PasswordInput value={password} onChange={event => setPassword(event.target.value)} /></label>
                    {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
                    <button disabled={busy} className="w-full rounded-xl bg-[#102b3b] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#19465b] disabled:cursor-wait disabled:opacity-60">{busy ? "Signing in…" : "Sign in securely"}</button>
                </form>
            </div>
        </section>
    </main>;
}
