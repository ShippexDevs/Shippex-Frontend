import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

const COUNTRY_CODES = [
  ["🇦🇺", "Australia", "+61"], ["🇧🇩", "Bangladesh", "+880"], ["🇧🇷", "Brazil", "+55"],
  ["🇨🇦", "Canada", "+1"], ["🇨🇳", "China", "+86"], ["🇩🇰", "Denmark", "+45"],
  ["🇪🇬", "Egypt", "+20"], ["🇫🇮", "Finland", "+358"], ["🇫🇷", "France", "+33"],
  ["🇩🇪", "Germany", "+49"], ["🇭🇰", "Hong Kong", "+852"], ["🇮🇳", "India", "+91"],
  ["🇮🇩", "Indonesia", "+62"], ["🇮🇪", "Ireland", "+353"], ["🇮🇱", "Israel", "+972"],
  ["🇮🇹", "Italy", "+39"], ["🇯🇵", "Japan", "+81"], ["🇰🇪", "Kenya", "+254"],
  ["🇰🇼", "Kuwait", "+965"], ["🇲🇾", "Malaysia", "+60"], ["🇲🇽", "Mexico", "+52"],
  ["🇳🇵", "Nepal", "+977"], ["🇳🇱", "Netherlands", "+31"], ["🇳🇿", "New Zealand", "+64"],
  ["🇳🇬", "Nigeria", "+234"], ["🇳🇴", "Norway", "+47"], ["🇵🇰", "Pakistan", "+92"],
  ["🇵🇭", "Philippines", "+63"], ["🇵🇱", "Poland", "+48"], ["🇵🇹", "Portugal", "+351"],
  ["🇶🇦", "Qatar", "+974"], ["🇷🇺", "Russia", "+7"], ["🇸🇦", "Saudi Arabia", "+966"],
  ["🇸🇬", "Singapore", "+65"], ["🇿🇦", "South Africa", "+27"], ["🇰🇷", "South Korea", "+82"],
  ["🇪🇸", "Spain", "+34"], ["🇱🇰", "Sri Lanka", "+94"], ["🇸🇪", "Sweden", "+46"],
  ["🇨🇭", "Switzerland", "+41"], ["🇹🇼", "Taiwan", "+886"], ["🇹🇭", "Thailand", "+66"],
  ["🇹🇷", "Turkey", "+90"], ["🇦🇪", "United Arab Emirates", "+971"], ["🇬🇧", "United Kingdom", "+44"],
  ["🇺🇸", "United States", "+1"], ["🇻🇳", "Vietnam", "+84"], ["🌐", "Other", ""],
].map(([flag, country, code]) => ({ flag, country, code }));

function CountryPhoneInput({ countryCode, phoneNumber, onCountryCodeChange, onPhoneNumberChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pickerRef = useRef(null);
  const selectedCountry = COUNTRY_CODES.find((country) => country.code === countryCode) || COUNTRY_CODES.at(-1);
  const filteredCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return COUNTRY_CODES.filter(({ country, code }) => `${country} ${code}`.toLowerCase().includes(normalizedQuery));
  }, [query]);

  useEffect(() => {
    function closeOnOutsideClick(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) setOpen(false);
    }
    function closeOnEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function selectCountry(country) {
    onCountryCodeChange(country.code);
    setOpen(false);
    setQuery("");
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700" htmlFor="phone-number">WhatsApp number <span className="text-red-500">*</span></label>
      <div className="flex min-w-0 gap-2">
        <div className="relative w-[42%] min-w-[132px] max-w-[176px] shrink-0" ref={pickerRef}>
          <button
            type="button"
            aria-label="Choose country calling code"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((wasOpen) => !wasOpen)}
            className="flex h-full min-h-12 w-full items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white px-3 text-left shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0F6E8C]/20"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span aria-hidden="true" className="text-xl leading-none">{selectedCountry.flag}</span>
              <span className="truncate text-sm font-semibold text-slate-800">{countryCode || "Other"}</span>
            </span>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {open && <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-[min(19rem,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
            <div className="border-b border-slate-100 p-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#0F6E8C] focus-within:ring-2 focus-within:ring-[#0F6E8C]/10">
                <Search size={16} className="shrink-0 text-slate-400" />
                <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search country or code" aria-label="Search countries" className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" />
              </div>
            </div>
            <ul role="listbox" aria-label="Country calling codes" className="max-h-64 overflow-y-auto p-1.5">
              {filteredCountries.map((country) => <li key={`${country.country}-${country.code}`} role="option" aria-selected={country.code === countryCode}>
                <button type="button" onClick={() => selectCountry(country)} className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left transition hover:bg-slate-50 ${country.code === countryCode ? "bg-cyan-50 text-[#0A2342]" : "text-slate-700"}`}>
                  <span aria-hidden="true" className="text-xl leading-none">{country.flag}</span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">{country.country}</span>
                  <span className="text-sm text-slate-500">{country.code || "Enter full number"}</span>
                  {country.code === countryCode && <Check size={16} className="text-[#0F6E8C]" />}
                </button>
              </li>)}
              {filteredCountries.length === 0 && <li className="px-3 py-6 text-center text-sm text-slate-500">No matching country</li>}
            </ul>
          </div>}
        </div>
        <input
          id="phone-number"
          name="phoneNumber"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required
          value={phoneNumber}
          onChange={(event) => onPhoneNumberChange(event.target.value.replace(countryCode ? /\D/g : /[^+\d]/g, ""))}
          placeholder={countryCode ? "Phone number" : "+1234567890"}
          className="h-12 min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#0F6E8C] focus:ring-2 focus:ring-[#0F6E8C]/15"
        />
      </div>
      {!countryCode && <p className="text-xs leading-5 text-slate-500">Include the + sign and country calling code.</p>}
    </div>
  );
}

export function toInternationalPhone(countryCode, phoneNumber) {
  return countryCode ? `${countryCode}${phoneNumber.replace(/\D/g, "")}` : phoneNumber.trim();
}

export default CountryPhoneInput;
