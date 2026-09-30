import { useEffect, useState } from "react";
import { Eye, RefreshCw, X, Users } from "lucide-react";
import adminAxios from "../services/adminAxios";

const userDetails = [
    ["User ID", "id"],
    ["Name", "name"],
    ["Username", "username"],
    ["Email", "email"],
    ["WhatsApp Contact", "whatsappContactNo"],
    ["Designation", "designation"],
    ["Ship Name", "shipName"],
    ["IMO Number", "shipIMONumber"],
    ["Account Status", "accountStatus"],
    ["Verified", "verified"],
];

function AdminUsersPage() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [statusUpdatingId, setStatusUpdatingId] = useState(null);
    const [statusMessages, setStatusMessages] = useState({});
    const [statusConfirmation, setStatusConfirmation] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await adminAxios.get("/api/admin/users");
            const data = response.data?.data;
            setUsers(Array.isArray(data) ? data : []);
        } catch (fetchError) {
            setError(fetchError.response?.data?.message || "Unable to load app users. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const updateUserStatus = async (user, enabled) => {
        setStatusUpdatingId(user.id);
        setStatusMessages((messages) => ({ ...messages, [user.id]: "" }));
        try {
            const response = await adminAxios.patch(`/api/admin/${encodeURIComponent(user.id)}/status`, { enabled });
            const updatedUser = response.data?.data || {};
            const nextUser = {
                ...user,
                ...updatedUser,
                accountStatus: updatedUser.accountStatus || (enabled ? "ACTIVE" : "DISABLED"),
            };
            setUsers((currentUsers) => currentUsers.map((item) => item.id === user.id ? nextUser : item));
            setSelectedUser((current) => current?.id === user.id ? nextUser : current);
            setStatusMessages((messages) => ({ ...messages, [user.id]: `User ${enabled ? "enabled" : "disabled"} successfully.` }));
        } catch (statusError) {
            setStatusMessages((messages) => ({
                ...messages,
                [user.id]: statusError.response?.data?.message || "Unable to update user status. Please try again.",
            }));
        } finally {
            setStatusUpdatingId(null);
        }
    };

    return (
        <main className="min-h-screen">
            <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-7 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]"><Users size={22} /></div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Users</h1>
                        <p className="mt-1 text-sm text-slate-500">View and manage customer accounts.</p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-5 py-4">
                        <h2 className="font-semibold text-slate-800">User Management</h2>
                        <p className="mt-1 text-sm text-slate-500">Customer account details and status.</p>
                    </div>
                    <button type="button" onClick={fetchUsers} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-60"><RefreshCw size={16} className={loading ? "animate-spin" : ""} />{loading ? "Loading..." : "Refresh"}</button>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] text-left">
                            <thead className="bg-slate-50">
                                <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                                    <th className="px-5 py-4 font-semibold">Name</th>
                                    <th className="px-5 py-4 font-semibold">Username</th>
                                    <th className="px-5 py-4 font-semibold">Email</th>
                                    <th className="px-5 py-4 font-semibold">WhatsApp</th>
                                    <th className="px-5 py-4 font-semibold">Designation</th>
                                    <th className="px-5 py-4 font-semibold">Status</th>
                                    <th className="px-5 py-4 font-semibold">Status Action</th>
                                    <th className="px-5 py-4 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/70">
                                        <td className="px-5 py-4 text-sm font-semibold text-slate-800">{user.name || "-"}</td>
                                        <td className="px-5 py-4 text-sm text-slate-600">{user.username || "-"}</td>
                                        <td className="px-5 py-4 text-sm text-slate-600">{user.email || "-"}</td>
                                        <td className="px-5 py-4 text-sm text-slate-600">{user.whatsappContactNo || "-"}</td>
                                        <td className="px-5 py-4 text-sm text-slate-600">{user.designation?.replaceAll("_", " ") || "-"}</td>
                                        <td className="px-5 py-4 text-sm text-slate-600">{user.accountStatus || "-"}</td>
                                        <td className="px-5 py-4"><select value="" disabled={statusUpdatingId === user.id} onChange={(event) => { if (event.target.value) setStatusConfirmation({ user, enabled: event.target.value === "ENABLE" }); }} aria-label={`Account status action for ${user.name || user.username}`} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 disabled:cursor-wait disabled:opacity-60"><option value="">{statusUpdatingId === user.id ? "Updating..." : "Choose action"}</option>{user.accountStatus !== "ACTIVE" && <option value="ENABLE">Enable User</option>}{user.accountStatus !== "DISABLED" && <option value="DISABLE">Disable User</option>}</select>{statusMessages[user.id] && <p className={`mt-1 max-w-48 text-xs ${statusMessages[user.id].includes("successfully") ? "text-emerald-600" : "text-red-600"}`} role="status">{statusMessages[user.id]}</p>}</td>
                                        <td className="px-5 py-4 text-right"><button type="button" onClick={() => setSelectedUser(user)} className="inline-flex items-center gap-2 rounded-lg border border-[#087E8B]/20 bg-[#087E8B]/5 px-3 py-2 text-sm font-semibold text-[#087E8B] hover:bg-[#087E8B]/10"><Eye size={15} />View Details</button></td>
                                    </tr>
                                ))}
                                {!loading && users.length === 0 && <tr><td colSpan={8} className="px-5 py-12 text-center">
                                    <p className="text-sm font-semibold text-slate-700">{error ? "Unable to load users" : "No app users found"}</p>
                                    <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">{error || "There are currently no customer accounts to display."}</p>
                                    {error && <button type="button" onClick={fetchUsers} className="mt-4 rounded-lg bg-[#087E8B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#066b76]">Try Again</button>}
                                </td></tr>}
                                {loading && <tr><td colSpan={8} className="px-5 py-12 text-center text-sm text-slate-500">Loading app users...</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {selectedUser && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedUser(null); }}>
                <section role="dialog" aria-modal="true" aria-labelledby="app-user-details-title" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
                    <div className="mb-5 flex items-start justify-between border-b border-slate-100 pb-4">
                        <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">User Details</p><h2 id="app-user-details-title" className="mt-1 text-xl font-bold text-slate-900">{selectedUser.name || selectedUser.username || "App User"}</h2></div>
                        <button type="button" onClick={() => setSelectedUser(null)} aria-label="Close details" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={18} /></button>
                    </div>
                    <dl className="grid gap-3 sm:grid-cols-2">
                        {userDetails.map(([label, key]) => <div key={key} className="rounded-xl bg-slate-50 p-3"><dt className="text-[11px] uppercase tracking-wide text-slate-400">{label}</dt><dd className="mt-1 break-words text-sm font-medium text-slate-700">{selectedUser[key] === true ? "Yes" : selectedUser[key] === false ? "No" : selectedUser[key] || "-"}</dd></div>)}
                    </dl>
                </section>
            </div>}
            {statusConfirmation && <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" role="presentation">
                <section role="alertdialog" aria-modal="true" aria-labelledby="user-status-confirm-title" aria-describedby="user-status-confirm-message" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                    <h2 id="user-status-confirm-title" className="text-lg font-bold text-slate-900">Confirm {statusConfirmation.enabled ? "enable" : "disable"}</h2>
                    <p id="user-status-confirm-message" className="mt-2 text-sm text-slate-600">Are you sure you want to {statusConfirmation.enabled ? "enable" : "disable"} {statusConfirmation.user.name || statusConfirmation.user.username || "this user"}?</p>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={() => setStatusConfirmation(null)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
                        <button type="button" onClick={() => { const { user, enabled } = statusConfirmation; setStatusConfirmation(null); updateUserStatus(user, enabled); }} className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white ${statusConfirmation.enabled ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"}`}>{statusConfirmation.enabled ? "Enable User" : "Disable User"}</button>
                    </div>
                </section>
            </div>}
        </main>
    );
}

export default AdminUsersPage;
