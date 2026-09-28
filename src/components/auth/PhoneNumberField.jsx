
import { useEffect, useRef, useState } from "react";

import {
    CircleCheck,
    ChevronDown,
    Loader2,
    Search,
    Globe2,
} from "lucide-react";

import {
    sendOtp,
    validateOtp,
} from "../../features/auth/services/registerService";

const COUNTRY_CODES = [
    { value: "+66", name: "Thailand", flag: "🇹🇭" },
    { value: "+60", name: "Malaysia", flag: "🇲🇾" },
    { value: "+62", name: "Indonesia", flag: "🇮🇩" },
    { value: "+94", name: "Sri Lanka", flag: "🇱🇰" },
    { value: "+91", name: "India", flag: "🇮🇳" },
    { value: "+880", name: "Bangladesh", flag: "🇧🇩" },
    { value: "+65", name: "Singapore", flag: "🇸🇬" },
    { value: "+95", name: "Myanmar", flag: "🇲🇲" },
    { value: "+7", name: "Russia", flag: "🇷🇺" },
    { value: "+86", name: "China", flag: "🇨🇳" },
    { value: "+380", name: "Ukraine", flag: "🇺🇦" },
    { value: "", name: "Others", flag: "🌐" },
];

function PhoneNumberField({
    countryCode,
    phoneNumber,
    onChange,
    error,
    onVerified,
}) {
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [otp, setOtp] = useState("");
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const [otpMessage, setOtpMessage] = useState("");

    const [countryDropdownOpen, setCountryDropdownOpen] =
        useState(false);
    const [countrySearch, setCountrySearch] = useState("");

    const dropdownRef = useRef(null);

    const selectedCountry =
        COUNTRY_CODES.find(
            (country) => country.value === countryCode
        ) || COUNTRY_CODES[4];

    const filteredCountries = COUNTRY_CODES.filter((country) =>
        `${country.name} ${country.value}`
            .toLowerCase()
            .includes(countrySearch.toLowerCase().trim())
    );

    const noCountryFound =
        countrySearch.trim().length > 0 &&
        filteredCountries.length === 0;

    const fullPhoneNumber = countryCode
        ? `${countryCode}${phoneNumber}`
        : phoneNumber;

    useEffect(() => {
        function handleOutsideClick(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setCountryDropdownOpen(false);
                setCountrySearch("");
            }
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                setCountryDropdownOpen(false);
                setCountrySearch("");
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    function handleCountrySelect(country) {
        onChange({
            target: {
                name: "countryCode",
                value: country.value,
            },
        });

        setCountryDropdownOpen(false);
        setCountrySearch("");
        setOtpSent(false);
        setOtp("");
        setOtpMessage("");
    }

    async function handleSendOtp() {
        if (!phoneNumber.trim()) {
            setOtpMessage("Enter your WhatsApp number first.");
            return;
        }

        if (
            !countryCode &&
            !phoneNumber.trim().startsWith("+")
        ) {
            setOtpMessage(
                "For Others, enter the complete number including the country calling code (e.g. +1234567890)."
            );
            return;
        }

        setSendingOtp(true);
        setOtpMessage("");

        try {
            const result = await sendOtp(fullPhoneNumber);

            setOtpMessage(result.message);

            if (result.success) {
                setOtpSent(true);
            }
        } catch {
            setOtpMessage("Unable to send OTP. Please try again.");
        } finally {
            setSendingOtp(false);
        }
    }

    async function handleVerifyOtp() {
        if (otp.trim().length !== 6) {
            setOtpMessage("Please enter the 6-digit OTP.");
            return;
        }

        setVerifyingOtp(true);
        setOtpMessage("");

        try {
            const result = await validateOtp(fullPhoneNumber, otp);

            setOtpMessage(result.message);

            if (result.success) {
                setVerified(true);
                onVerified?.(true);
            }
        } catch {
            setOtpMessage("Unable to verify OTP. Please try again.");
        } finally {
            setVerifyingOtp(false);
        }
    }

    return (
        <div className="space-y-5">
            {/* WhatsApp Number */}

            <div>
                <label className="block text-sm font-semibold text-slate-700">
                    WhatsApp Number
                    <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="mt-2 flex w-full min-w-0 gap-2 sm:gap-3">
                    {/* Custom Country Selector */}

                    <div
                        ref={dropdownRef}
                        className="relative w-[145px] shrink-0 sm:w-[180px]"
                    >
                        <button
                            type="button"
                            disabled={verified}
                            aria-haspopup="listbox"
                            aria-expanded={countryDropdownOpen}
                            onClick={() =>
                                setCountryDropdownOpen((open) => !open)
                            }
                            className={`
                                flex
                                min-h-[48px]
                                w-full
                                items-center
                                gap-2
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                px-3
                                text-left
                                shadow-sm
                                transition
                                hover:border-cyan-500
                                hover:bg-slate-50
                                focus:outline-none
                                focus:ring-2
                                focus:ring-cyan-100
                                disabled:cursor-not-allowed
                                disabled:bg-slate-100
                                ${
                                    countryDropdownOpen
                                        ? "border-cyan-600 ring-2 ring-cyan-100"
                                        : ""
                                }
                            `}
                        >
                            <span className="text-lg leading-none">
                                {selectedCountry.flag}
                            </span>

                            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-700">
                                {selectedCountry.value || "Others"}
                            </span>

                            <ChevronDown
                                size={16}
                                className={`
                                    shrink-0
                                    text-slate-400
                                    transition-transform
                                    ${
                                        countryDropdownOpen
                                            ? "rotate-180"
                                            : ""
                                    }
                                `}
                            />
                        </button>

                        {countryDropdownOpen && (
                            <div
                                className="
                                    absolute
                                    left-0
                                    top-full
                                    z-[60]
                                    mt-2
                                    w-[280px]
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    shadow-xl
                                    sm:w-[320px]
                                "
                            >
                                {/* Dropdown Header */}

                                <div className="border-b border-slate-100 p-3">
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Select country
                                    </p>

                                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
                                        <Search
                                            size={16}
                                            className="shrink-0 text-slate-400"
                                        />

                                        <input
                                            type="text"
                                            value={countrySearch}
                                            onChange={(event) =>
                                                setCountrySearch(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Search country or code..."
                                            className="
                                                min-w-0
                                                w-full
                                                bg-transparent
                                                py-2.5
                                                text-sm
                                                text-slate-700
                                                outline-none
                                                placeholder:text-slate-400
                                            "
                                        />
                                    </div>
                                </div>

                                {/* Country Options */}

                                <div
                                    role="listbox"
                                    aria-label="Country calling codes"
                                    className="max-h-64 overflow-y-auto p-1.5"
                                >
                                    {filteredCountries.map((country) => {
                                        const isSelected =
                                            country.value === countryCode;

                                        return (
                                            <button
                                                key={country.name}
                                                type="button"
                                                role="option"
                                                aria-selected={isSelected}
                                                onClick={() =>
                                                    handleCountrySelect(country)
                                                }
                                                className={`
                                                    grid
                                                    w-full
                                                    grid-cols-[28px_minmax(0,1fr)_58px]
                                                    items-center
                                                    gap-2
                                                    rounded-xl
                                                    px-3
                                                    py-2.5
                                                    text-left
                                                    transition
                                                    ${
                                                        isSelected
                                                            ? "bg-cyan-50 text-cyan-800"
                                                            : "text-slate-700 hover:bg-slate-50"
                                                    }
                                                `}
                                            >
                                                <span className="text-lg leading-none">
                                                    {country.flag}
                                                </span>

                                                <span className="truncate text-sm font-medium">
                                                    {country.name}
                                                </span>

                                                <span className="text-right text-sm font-semibold tabular-nums text-slate-500">
                                                    {country.value || "Other"}
                                                </span>
                                            </button>
                                        );
                                    })}

                                    {/* No Match Found */}

                                    {noCountryFound && (
                                        <div className="space-y-3 p-3">
                                            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                                                <div className="flex items-start gap-2">
                                                    <Globe2
                                                        size={18}
                                                        className="mt-0.5 shrink-0 text-amber-600"
                                                    />

                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-800">
                                                            Country not found
                                                        </p>

                                                        <p className="mt-1 text-xs leading-5 text-slate-600">
                                                            Your country is not
                                                            listed. Please select
                                                            Others.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                role="option"
                                                aria-selected={!countryCode}
                                                onClick={() =>
                                                    handleCountrySelect(
                                                        COUNTRY_CODES[
                                                            COUNTRY_CODES.length - 1
                                                        ]
                                                    )
                                                }
                                                className="
                                                    grid
                                                    w-full
                                                    grid-cols-[28px_minmax(0,1fr)_58px]
                                                    items-center
                                                    gap-2
                                                    rounded-xl
                                                    border
                                                    border-cyan-200
                                                    bg-cyan-50
                                                    px-3
                                                    py-3
                                                    text-left
                                                    transition
                                                    hover:border-cyan-400
                                                    hover:bg-cyan-100
                                                "
                                            >
                                                <span className="text-lg">
                                                    🌐
                                                </span>

                                                <span className="text-sm font-semibold text-cyan-900">
                                                    Others
                                                </span>

                                                <span className="text-right text-xs font-medium text-cyan-700">
                                                    Select
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Dropdown Footer */}

                                <div className="border-t border-slate-100 bg-slate-50 px-3 py-2">
                                    <p className="text-xs text-slate-400">
                                        {COUNTRY_CODES.length} options available
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Phone Number Input */}

                    <input
                        name="whatsappContactNo"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        value={phoneNumber}
                        disabled={verified}
                        onChange={onChange}
                        placeholder={
                            countryCode
                                ? "9876543210"
                                : "+1234567890"
                        }
                        className={`
                            min-w-0
                            w-full
                            rounded-2xl
                            border
                            bg-white
                            px-4
                            py-3
                            text-sm
                            text-slate-800
                            outline-none
                            transition
                            focus:border-cyan-600
                            focus:ring-2
                            focus:ring-cyan-100
                            ${
                                error
                                    ? "border-red-400"
                                    : "border-slate-300"
                            }
                            disabled:bg-slate-100
                        `}
                    />
                </div>

                {error && (
                    <p className="mt-2 text-sm text-red-500">
                        {error}
                    </p>
                )}

                {!countryCode && (
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                        Enter the complete international number, including
                        the + sign and country calling code.
                    </p>
                )}
            </div>

            {/* Send OTP */}

            {!otpSent && (
                <button
                    type="button"
                    disabled={sendingOtp || verified}
                    onClick={handleSendOtp}
                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-[#0A2342]
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#123B68]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    {sendingOtp ? (
                        <>
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                            Sending...
                        </>
                    ) : (
                        "Send OTP"
                    )}
                </button>
            )}

            {/* Verify OTP */}

            {otpSent && !verified && (
                <>
                    <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        value={otp}
                        onChange={(event) =>
                            setOtp(
                                event.target.value.replace(/\D/g, "")
                            )
                        }
                        placeholder="Enter 6 digit OTP"
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-slate-300
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-cyan-600
                            focus:ring-2
                            focus:ring-cyan-100
                        "
                    />

                    <button
                        type="button"
                        disabled={
                            verifyingOtp || otp.length !== 6
                        }
                        onClick={handleVerifyOtp}
                        className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-2xl
                            bg-[#0F6E8C]
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-[#0b5b74]
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        {verifyingOtp ? (
                            <>
                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />
                                Verifying...
                            </>
                        ) : (
                            "Verify OTP"
                        )}
                    </button>
                </>
            )}

            {/* Verified State */}

            {verified && (
                <div
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-2xl
                        border
                        border-green-100
                        bg-green-50
                        p-4
                        text-green-700
                    "
                >
                    <CircleCheck size={20} />

                    <span className="text-sm font-medium">
                        WhatsApp number verified
                    </span>
                </div>
            )}

            {/* OTP Feedback */}

            {otpMessage && (
                <div
                    role="status"
                    className="
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        p-3
                        text-sm
                        text-slate-600
                    "
                >
                    {otpMessage}
                </div>
            )}
        </div>
    );
}

export default PhoneNumberField;