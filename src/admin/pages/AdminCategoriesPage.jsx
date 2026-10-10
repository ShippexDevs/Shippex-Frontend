import { useEffect, useMemo, useState } from "react";
import { Check, CircleAlert, Image, Pencil, Plus, RefreshCw, Search, Tags, X } from "lucide-react";
import { createAdminCategory, getAdminCategories, getAdminCategoryNextSku, updateAdminCategory, updateAdminCategoryStatus } from "../services/adminCategoryApi";

const EMPTY_FORM = { name: "", skuPrefix: "", description: "", imageUrl: "", active: true };

function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState({});
  const [previews, setPreviews] = useState({});

  async function loadCategories() {
    setLoading(true); setLoadError("");
    try { setCategories(await getAdminCategories()); }
    catch (e) { setLoadError(e.response?.data?.message || "Could not load categories. Check your admin session and try again."); }
    finally { setLoading(false); }
  }
  useEffect(() => { loadCategories(); }, []);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return categories.filter((c) => !q || [c.name, c.slug, c.skuPrefix, c.description].some((v) => v?.toLowerCase().includes(q)));
  }, [categories, search]);

  function openForm(category = null) {
    setEditing(category); setForm(category ? { ...EMPTY_FORM, ...category, active: Boolean(category.active) } : EMPTY_FORM);
    setError(""); setFormOpen(true);
  }
  async function save(event) {
    event.preventDefault(); setSaving(true); setError("");
    const payload = { ...form, name: form.name.trim(), skuPrefix: form.skuPrefix.trim().toUpperCase(), description: form.description.trim(), imageUrl: form.imageUrl.trim() };
    try {
      if (editing) await updateAdminCategory(editing.id, payload);
      else await createAdminCategory(payload);
      setFormOpen(false); setEditing(null);
      // Reload the complete admin list so persisted and newly saved categories
      // are always represented from the backend response.
      await loadCategories();
    } catch (e) { setError(e.response?.data?.message || "Could not save this category. Check the name and SKU prefix."); }
    finally { setSaving(false); }
  }
  async function toggle(category) {
    setBusy((current) => ({ ...current, [category.id]: true }));
    try {
      const result = await updateAdminCategoryStatus(category.id, !category.active);
      setCategories((current) => current.map((c) => c.id === category.id ? { ...c, ...result } : c));
    } catch (e) { setLoadError(e.response?.data?.message || "Could not update category status."); }
    finally { setBusy((current) => ({ ...current, [category.id]: false })); }
  }
  async function preview(category) {
    setBusy((current) => ({ ...current, [`sku-${category.id}`]: true }));
    try { const result = await getAdminCategoryNextSku(category.id); setPreviews((current) => ({ ...current, [category.id]: result.sku })); }
    catch (e) { setPreviews((current) => ({ ...current, [category.id]: e.response?.data?.message || "Preview unavailable" })); }
    finally { setBusy((current) => ({ ...current, [`sku-${category.id}`]: false })); }
  }

  return <main className="min-h-screen"><div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]"><Tags size={22} /></div><div><h1 className="text-2xl font-bold tracking-tight text-slate-900">Categories</h1><p className="mt-1 text-sm text-slate-500">Manage storefront categories and product SKU prefixes.</p></div></div><div className="flex gap-2"><button type="button" onClick={() => openForm()} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#087E8B] px-4 text-sm font-semibold text-white hover:bg-[#066875]"><Plus size={17} />Add category</button><button type="button" disabled={loading} onClick={loadCategories} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60"><RefreshCw size={16} className={loading ? "animate-spin" : ""} />Refresh</button></div></header>
    <div className="mb-5 rounded-xl border border-cyan-200 bg-cyan-50 p-3 text-sm text-cyan-950"><p className="flex items-start gap-2"><CircleAlert size={17} className="mt-0.5 shrink-0" /><span>Category names generate their customer facing slug. SKU prefixes must be unique and contain 1–8 letters or numbers. Inactive categories are hidden from customers and cannot be selected for new products.</span></p></div>
    {formOpen && <form onSubmit={save} className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"><div className="mb-5 flex items-start justify-between"><div><h2 className="text-lg font-bold">{editing ? "Edit category" : "Create category"}</h2><p className="mt-1 text-sm text-slate-500">Slug is generated automatically from the category name.</p></div><button type="button" aria-label="Close form" onClick={() => setFormOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={18} /></button></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[["name", "Category name", true], ["skuPrefix", "SKU prefix", true], ["imageUrl", "Image URL", false]].map(([key, label, required]) => <label key={key}><span className="mb-1.5 block text-sm font-medium text-slate-700">{label}{required && <span className="text-red-600"> *</span>}</span><input required={required} maxLength={key === "skuPrefix" ? 8 : undefined} pattern={key === "skuPrefix" ? "[A-Za-z0-9]{1,8}" : undefined} value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#087E8B]" /></label>)}
        <label className="sm:col-span-2 lg:col-span-3"><span className="mb-1.5 block text-sm font-medium text-slate-700">Description</span><textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#087E8B]" /></label><label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} className="h-4 w-4 accent-[#087E8B]" />Active / visible to customers</label></div>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}<div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setFormOpen(false)} className="min-h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600">Cancel</button><button disabled={saving} className="min-h-10 rounded-lg bg-[#087E8B] px-5 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Saving…" : editing ? "Save category" : "Create category"}</button></div>
    </form>}
    {loadError && <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{loadError}</p>}
    <label className="relative mb-4 block"><span className="sr-only">Search categories</span><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search categories…" className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-[#087E8B] sm:max-w-md" /></label>
    {loading ? <div className="rounded-2xl border border-slate-200 bg-white px-4 py-14 text-center text-sm text-slate-500">Loading categories…</div> : visible.length === 0 ? <div className="rounded-2xl border border-slate-200 bg-white px-4 py-14 text-center"><Tags size={28} className="mx-auto text-slate-300" /><p className="mt-3 font-semibold text-slate-700">No categories found</p><p className="mt-1 text-sm text-slate-500">Create a category or adjust your search.</p></div> : <div className="grid gap-4 xl:grid-cols-2">{visible.map((category) => <article key={category.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><div className="flex gap-3"><div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-50">{category.imageUrl ? <img src={category.imageUrl} alt="" className="h-full w-full object-cover" /> : <Image size={23} className="text-slate-300" />}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-2"><div><h2 className="font-semibold text-slate-900">{category.name}</h2><p className="mt-1 text-xs text-slate-500">/{category.slug} · Prefix {category.skuPrefix}</p></div><div className="flex items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${category.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{category.active ? "Active" : "Inactive"}</span><button type="button" onClick={() => openForm(category)} aria-label={`Edit ${category.name}`} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"><Pencil size={15} /></button></div></div>{category.description && <p className="mt-2 line-clamp-2 text-sm text-slate-600">{category.description}</p>}</div></div><div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4"><button type="button" disabled={busy[category.id]} onClick={() => toggle(category)} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">{category.active ? <X size={14} /> : <Check size={14} />}{busy[category.id] ? "Updating…" : category.active ? "Deactivate" : "Activate"}</button><div className="flex items-center gap-2"><span role="status" className="text-xs text-slate-500">{previews[category.id] || ""}</span><button type="button" disabled={!category.active || busy[`sku-${category.id}`]} onClick={() => preview(category)} className="min-h-9 rounded-lg bg-[#0A2342] px-3 text-xs font-semibold text-white hover:bg-[#123B63] disabled:opacity-40">{busy[`sku-${category.id}`] ? "Loading…" : "Preview next SKU"}</button></div></div></article>)}</div>}
  </div></main>;
}

export default AdminCategoriesPage;
