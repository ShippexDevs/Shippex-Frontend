import { useEffect, useMemo, useState } from "react";
import { Info, Package, Plus, RefreshCw, Search, Star, ToggleLeft, Pencil, X, Sparkles } from "lucide-react";
import {
  createAdminProduct,
  getAdminProducts,
  updateAdminProduct,
  updateAdminProductActive,
  updateAdminProductFeatured,
  updateAdminProductStock,
} from "../services/adminProductApi";
import { generateAdminProductTags, getAdminCategories, getAdminCategoryNextSku } from "../services/adminCategoryApi";

const PAGE_SIZE = 12;

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [stockDrafts, setStockDrafts] = useState({});
  const [updating, setUpdating] = useState({});
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);
  const [formError, setFormError] = useState("");
  const [categories, setCategories] = useState([]);
  const productCategories = useMemo(() => {
    const found = new Map();
    products.forEach((product) => {
      if (product.categorySlug) found.set(product.categorySlug, product.category || product.categorySlug);
    });
    return [...found.entries()].map(([slug, name]) => ({ slug, name }));
  }, [products]);

  const loadProducts = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const loaded = [];
      let offset = 0;
      const pageSize = 100;
      while (true) {
        const page = await getAdminProducts(offset, pageSize);
        loaded.push(...page);
        if (page.length < pageSize) break;
        offset += pageSize;
      }
      const uniqueProducts = [...new Map(loaded.map((product) => [product.id, product])).values()];
      setProducts(uniqueProducts);
      setStockDrafts(Object.fromEntries(uniqueProducts.map((product) => [product.id, String(product.stock ?? 0)])));
      setPage(1);
      if (uniqueProducts.length === 0) setLoadError("No products were returned by the admin product list.");
    } catch {
      setLoadError("Unable to load products. Check that the backend is running and your admin session is valid, then try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    getAdminCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = categoryFilter === "all" || product.categorySlug === categoryFilter;
      const matchesQuery = !query || [product.name, product.sku, product.brand, product.category]
        .some((value) => value?.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [products, search, categoryFilter]);
  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return visibleProducts.slice(start, start + PAGE_SIZE);
  }, [visibleProducts, currentPage]);
  const firstVisibleIndex = visibleProducts.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const lastVisibleIndex = Math.min(currentPage * PAGE_SIZE, visibleProducts.length);

  function markUpdating(key, active) {
    setUpdating((current) => ({ ...current, [key]: active }));
    if (active) setMessages((current) => ({ ...current, [key]: "" }));
  }

  function mergeProduct(productId, updatedProduct, fallback) {
    const changes = updatedProduct && typeof updatedProduct === "object" ? updatedProduct : {};
    const next = { ...fallback, ...changes };
    setProducts((current) => current.map((product) => product.id === productId ? next : product));
    setStockDrafts((current) => ({ ...current, [productId]: String(next.stock ?? 0) }));
  }

  async function saveStock(product) {
    const stock = Number(stockDrafts[product.id]);
    if (!Number.isInteger(stock) || stock < 0) {
      setMessages((current) => ({ ...current, [`${product.id}-stock`]: "Enter a whole number of 0 or more." }));
      return;
    }
    const key = `${product.id}-stock`;
    markUpdating(key, true);
    try {
      const updated = await updateAdminProductStock(product.id, stock);
      mergeProduct(product.id, updated, { ...product, stock });
      setMessages((current) => ({ ...current, [key]: "Stock updated." }));
    } catch (error) {
      setMessages((current) => ({ ...current, [key]: error.response?.data?.message || "Could not update stock. Try again." }));
    } finally {
      markUpdating(key, false);
    }
  }

  async function toggleProductAttribute(product, attribute) {
    const nextValue = !product[attribute];
    const key = `${product.id}-${attribute}`;
    markUpdating(key, true);
    try {
      const update = attribute === "featured" ? updateAdminProductFeatured : updateAdminProductActive;
      const updated = await update(product.id, nextValue);
      mergeProduct(product.id, updated, { ...product, [attribute]: nextValue });
      setMessages((current) => ({ ...current, [key]: `${attribute === "featured" ? "Featured status" : "Product status"} updated.` }));
    } catch (error) {
      setMessages((current) => ({ ...current, [key]: error.response?.data?.message || `Could not update ${attribute} status. Try again.` }));
    } finally {
      markUpdating(key, false);
    }
  }

  async function saveProduct(formData) {
    setSavingProduct(true);
    setFormError("");
    try {
      const result = editingProduct
        ? await updateAdminProduct(editingProduct.id, formData)
        : await createAdminProduct(formData);
      const saved = { ...(editingProduct || {}), ...result };
      setProducts((current) => editingProduct
        ? current.map((product) => product.id === saved.id ? saved : product)
        : [saved, ...current]);
      setStockDrafts((current) => ({ ...current, [saved.id]: String(saved.stock ?? 0) }));
      setFormOpen(false);
      setEditingProduct(null);
    } catch (error) {
      setFormError(error.response?.data?.message || "Could not save the product. Check the fields and try again.");
    } finally {
      setSavingProduct(false);
    }
  }

  function openCreateForm() {
    setEditingProduct(null);
    setFormError("");
    setFormOpen(true);
  }

  function openEditForm(product) {
    setEditingProduct(product);
    setFormError("");
    setFormOpen(true);
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]"><Package size={22} /></div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Products</h1>
              <p className="mt-1 text-sm text-slate-500">Update stock and storefront visibility.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 self-start sm:self-auto">
            <button type="button" onClick={openCreateForm} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#087E8B] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066875]"><Plus size={17} />Add product</button>
            <button type="button" onClick={loadProducts} disabled={loading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"><RefreshCw size={16} className={loading ? "animate-spin" : ""} />{loading ? "Loading…" : "Refresh"}</button>
          </div>
        </header>

        {formOpen && <ProductForm product={editingProduct} categories={categories} saving={savingProduct} error={formError} onCancel={() => { setFormOpen(false); setEditingProduct(null); setFormError(""); }} onSave={saveProduct} />}

        <div className="mb-4 rounded-xl border border-cyan-200 bg-cyan-50 p-3 text-sm text-cyan-950">
          <p className="flex items-start gap-2"><Info size={17} className="mt-0.5 shrink-0" /><span>Stock changes save immediately. Featured and active settings control whether products are promoted or visible to customers.</span></p>
        </div>

        {loadError && <p role="status" className={`mb-4 rounded-xl px-4 py-3 text-sm ${products.length ? "border border-amber-200 bg-amber-50 text-amber-800" : "border border-red-200 bg-red-50 text-red-700"}`}>{loadError}</p>}

        <section className="mb-5 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[minmax(0,1fr)_220px] sm:p-5">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search by product, SKU, brand…" className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/10" />
          </label>
          <label className="block">
            <span className="sr-only">Filter by category</span>
            <select value={categoryFilter} onChange={(event) => { setCategoryFilter(event.target.value); setPage(1); }} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/10">
              <option value="all">All categories</option>
              {productCategories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
            </select>
          </label>
        </section>

        {loading ? <div className="rounded-2xl border border-slate-200 bg-white px-4 py-14 text-center text-sm text-slate-500">Loading products…</div> : visibleProducts.length === 0 ? <div className="rounded-2xl border border-slate-200 bg-white px-4 py-14 text-center"><Package size={28} className="mx-auto text-slate-300" /><p className="mt-3 text-sm font-semibold text-slate-700">No products found</p><p className="mt-1 text-sm text-slate-500">Try another search or category.</p></div> : (
          <div className="grid gap-4 xl:grid-cols-2">
            {pageProducts.map((product) => <ProductManagementCard key={product.id} product={product} stockDraft={stockDrafts[product.id] ?? ""} onStockChange={(stock) => setStockDrafts((current) => ({ ...current, [product.id]: stock }))} onSaveStock={() => saveStock(product)} onToggle={toggleProductAttribute} onEdit={openEditForm} updating={updating} messages={messages} />)}
          </div>
        )}

        {!loading && visibleProducts.length > 0 && <nav aria-label="Product pages" className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:px-5">
          <p className="text-sm text-slate-600">Showing <span className="font-semibold text-slate-900">{firstVisibleIndex}–{lastVisibleIndex}</span> of <span className="font-semibold text-slate-900">{visibleProducts.length}</span> products</p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setPage(1)} disabled={currentPage === 1} className="min-h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">First</button>
            <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={currentPage === 1} className="min-h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
            <span aria-live="polite" className="min-w-20 text-center text-sm font-medium text-slate-500">Page {currentPage} of {totalPages}</span>
            <button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={currentPage === totalPages} className="min-h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
            <button type="button" onClick={() => setPage(totalPages)} disabled={currentPage === totalPages} className="min-h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Last</button>
          </div>
        </nav>}
      </div>
    </main>
  );
}

const emptyProductForm = {
  name: "", brand: "", sku: "", description: "", category: "", categorySlug: "",
  images: "", currency: "INR", currentPrice: "", originalPrice: "", unit: "",
  stock: "0", featured: false, active: false, displayOrder: "0", deliveryTime: "24hours", tags: "",
};

function ProductForm({ product, categories, saving, error, onCancel, onSave }) {
  const [values, setValues] = useState(() => product ? {
    ...emptyProductForm,
    ...product,
    images: product.images?.length ? [...product.images] : [""],
    tags: (product.tags || []).join(", "),
    currentPrice: product.currentPrice ?? "",
    originalPrice: product.originalPrice ?? "",
    stock: product.stock ?? 0,
    displayOrder: product.displayOrder ?? 0,
    categoryId: product.categoryId || "",
  } : { ...emptyProductForm, images: [""], categoryId: "" });
  const [skuPreview, setSkuPreview] = useState("");
  const [tagLoading, setTagLoading] = useState(false);
  const [tagError, setTagError] = useState("");
  const fields = [
    ["name", "Product name", "text", true], ["brand", "Brand", "text", true],
    ["currency", "Currency", "text", true],
    ["currentPrice", "Current price", "number", true], ["originalPrice", "Original price", "number", false],
    ["unit", "Unit (e.g. kg, each)", "text", !product], ["stock", "Stock", "number", !product],
    ["displayOrder", "Display order", "number", false], ["deliveryTime", "Delivery time", "text", false],
  ];
  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));
  function submit(event) {
    event.preventDefault();
    const payload = {
      name: values.name.trim(), brand: values.brand.trim(), description: values.description.trim(),
      category: categories.find((category) => category.id === values.categoryId)?.name || product?.category || "",
      categorySlug: categories.find((category) => category.id === values.categoryId)?.slug || product?.categorySlug || "",
      images: values.images.map((value) => value.trim()).filter(Boolean),
      currency: values.currency.trim().toUpperCase(), currentPrice: Number(values.currentPrice),
      originalPrice: values.originalPrice === "" ? null : Number(values.originalPrice),
      unit: values.unit.trim(), stock: Number(values.stock), featured: Boolean(values.featured),
      active: Boolean(values.active), displayOrder: values.displayOrder === "" ? null : Number(values.displayOrder),
      deliveryTime: values.deliveryTime.trim() || null,
      tags: values.tags.split(",").map((value) => value.trim()).filter(Boolean),
    };
    if (!product) payload.categoryId = values.categoryId;
    onSave(payload);
  }

  async function previewSku(categoryId) {
    setSkuPreview("");
    if (!categoryId) return;
    try { const preview = await getAdminCategoryNextSku(categoryId); setSkuPreview(preview.sku); }
    catch (e) { setSkuPreview(e.response?.data?.message || "SKU preview unavailable"); }
  }
  async function suggestTags() {
    if (!values.name.trim() || !values.description.trim() || !values.categoryId) {
      setTagError("Enter a product name, description, and category first."); return;
    }
    setTagLoading(true); setTagError("");
    try {
      const result = await generateAdminProductTags({ name: values.name.trim(), description: values.description.trim(), brand: values.brand.trim(), categoryId: values.categoryId });
      update("tags", (result.tags || []).join(", "));
    } catch (e) { setTagError(e.response?.data?.message || "Tag suggestions are unavailable. You can enter tags manually."); }
    finally { setTagLoading(false); }
  }

  return (
    <form onSubmit={submit} className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3"><div><h2 className="text-lg font-bold text-slate-900">{product ? "Update product" : "Add a product"}</h2><p className="mt-1 text-sm text-slate-500">Fields marked required are validated by the product API.</p></div><button type="button" onClick={onCancel} aria-label="Close form" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={18} /></button></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map(([key, label, type, required]) => <label key={key} className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">{label}{required && <span className="text-red-600"> *</span>}</span><input required={required} readOnly={key === "sku" && Boolean(product)} type={type} min={type === "number" ? 0 : undefined} step={key.includes("Price") ? "0.01" : type === "number" ? "1" : undefined} value={values[key] ?? ""} onChange={(event) => update(key, event.target.value)} className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/10 read-only:bg-slate-50" /></label>)}
        <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">Category <span className="text-red-600">*</span></span><select required value={values.categoryId} disabled={Boolean(product)} onChange={(event) => { update("categoryId", event.target.value); previewSku(event.target.value); }} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#087E8B] disabled:bg-slate-50"><option value="">Select a category</option>{categories.filter((category) => category.active || category.id === values.categoryId).map((category) => <option key={category.id} value={category.id}>{category.name}{category.active ? "" : " (inactive)"}</option>)}</select>{product && <span className="mt-1 block text-xs text-slate-500">Category changes are managed from the category records; this product keeps its stored category snapshot.</span>}{!product && <span className="mt-1 block text-xs text-slate-500">{skuPreview ? `Next SKU preview: ${skuPreview}` : "SKU is generated when the product is created."}</span>}</label>
        <label className="block sm:col-span-2 lg:col-span-3"><span className="mb-1.5 block text-sm font-medium text-slate-700">Description {!product && <span className="text-red-600">*</span>}</span><textarea required={!product} rows={3} value={values.description} onChange={(event) => update("description", event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/10" /></label>
        <div className="block sm:col-span-2"><span className="mb-1.5 block text-sm font-medium text-slate-700">Product photo links <span className="text-red-600">* At least one required</span></span><div className="space-y-2">{values.images.map((image, index) => <div key={index} className="flex gap-2"><input type="url" required={values.images.every((item) => !item.trim()) && index === 0} aria-label={`Photo link ${index + 1}`} placeholder="https://example.com/photo.jpg" value={image} onChange={(event) => setValues((current) => ({ ...current, images: current.images.map((item, itemIndex) => itemIndex === index ? event.target.value : item) }))} className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/10" />{values.images.length > 1 && <button type="button" aria-label={`Remove photo link ${index + 1}`} onClick={() => setValues((current) => ({ ...current, images: current.images.filter((_, itemIndex) => itemIndex !== index) }))} className="rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50">Remove</button>}</div>)}</div><button type="button" onClick={() => setValues((current) => ({ ...current, images: [...current.images, ""] }))} className="mt-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">+ Add another photo link</button></div>
        <div className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">Tags (comma separated)</span><div className="flex gap-2"><input value={values.tags} onChange={(event) => update("tags", event.target.value)} className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/10" /><button type="button" disabled={tagLoading} onClick={suggestTags} className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"><Sparkles size={15} />{tagLoading ? "Suggesting…" : "Suggest"}</button></div>{tagError && <p role="status" className="mt-1 text-xs text-amber-700">{tagError}</p>}</div>
        <div className="flex flex-wrap gap-5 sm:col-span-2 lg:col-span-3">{[["featured", "Featured"], ["active", "Active / visible"]].map(([key, label]) => <label key={key} className="inline-flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" checked={Boolean(values[key])} onChange={(event) => update(key, event.target.checked)} className="h-4 w-4 accent-[#087E8B]" />{label}</label>)}</div>
      </div>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <div className="mt-5 flex flex-wrap justify-end gap-2"><button type="button" onClick={onCancel} className="min-h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button><button type="submit" disabled={saving} className="min-h-10 rounded-lg bg-[#087E8B] px-5 text-sm font-semibold text-white hover:bg-[#066875] disabled:opacity-60">{saving ? "Saving…" : product ? "Save changes" : "Create product"}</button></div>
    </form>
  );
}

function ProductManagementCard({ product, stockDraft, onStockChange, onSaveStock, onToggle, onEdit, updating, messages }) {
  const image = product.images?.[0];
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-50 sm:h-20 sm:w-20">
          {image ? <img src={image} alt="" className="h-full w-full object-contain" /> : <Package size={25} className="text-slate-300" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="line-clamp-2 font-semibold text-slate-900">{product.name || "Unnamed product"}</h2>
              <p className="mt-1 truncate text-xs text-slate-500">{product.sku || "No SKU"} {product.brand ? `· ${product.brand}` : ""}</p>
              <p className="mt-1 text-xs text-slate-500">{product.category || "Uncategorized"}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${product.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{product.active ? "Active" : "Disabled"}</span><button type="button" onClick={() => onEdit(product)} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"><Pencil size={13} />Edit</button></div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <label htmlFor={`stock-${product.id}`} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Stock · {product.unit || "units"}</label>
          <div className="flex gap-2">
            <input id={`stock-${product.id}`} type="number" inputMode="numeric" min="0" step="1" value={stockDraft} onChange={(event) => onStockChange(event.target.value)} className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/10" />
            <button type="button" onClick={onSaveStock} disabled={updating[`${product.id}-stock`] || Number(stockDraft) === product.stock} className="min-h-10 rounded-lg bg-[#0A2342] px-3 text-sm font-semibold text-white transition hover:bg-[#123B63] disabled:cursor-not-allowed disabled:bg-slate-300">{updating[`${product.id}-stock`] ? "Saving…" : "Save stock"}</button>
          </div>
          {messages[`${product.id}-stock`] && <p role="status" className={`mt-1.5 text-xs ${messages[`${product.id}-stock`] === "Stock updated." ? "text-emerald-700" : "text-red-600"}`}>{messages[`${product.id}-stock`]}</p>}
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <button type="button" role="switch" aria-checked={Boolean(product.featured)} disabled={updating[`${product.id}-featured`]} onClick={() => onToggle(product, "featured")} className={`inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 text-sm font-semibold transition disabled:opacity-60 ${product.featured ? "border-amber-200 bg-amber-50 text-amber-800" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}><Star size={15} fill={product.featured ? "currentColor" : "none"} />{updating[`${product.id}-featured`] ? "Updating…" : product.featured ? "Featured" : "Not featured"}</button>
          <button type="button" role="switch" aria-checked={Boolean(product.active)} disabled={updating[`${product.id}-active`]} onClick={() => onToggle(product, "active")} className={`inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 text-sm font-semibold transition disabled:opacity-60 ${product.active ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}><ToggleLeft size={16} />{updating[`${product.id}-active`] ? "Updating…" : product.active ? "Disable" : "Enable"}</button>
        </div>
      </div>
      {(messages[`${product.id}-featured`] || messages[`${product.id}-active`]) && <p role="status" className="mt-2 text-xs text-emerald-700">{messages[`${product.id}-featured`] || messages[`${product.id}-active`]}</p>}
    </article>
  );
}

export default AdminProductsPage;
