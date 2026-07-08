import { useState } from "react";
import {
  CircleCheck,
  Loader2,
  RotateCw,
} from "lucide-react";

import {
  sendOtp,
  validateOtp,
} from "../../features/auth/services/registerService";

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

  const [sendingOtp, setSendingOtp] =
    useState(false);

  const [verifyingOtp, setVerifyingOtp] =
    useState(false);

  const [otpMessage, setOtpMessage] =
    useState("");

  async function handleSendOtp() {

    if (!phoneNumber.trim()) {
      setOtpMessage(
        "Enter WhatsApp number first."
      );
      return;
    }

    setSendingOtp(true);

    const result = await sendOtp(
      `${countryCode}${phoneNumber}`
    );

    setSendingOtp(false);

    setOtpMessage(result.message);

    if (result.success) {
      setOtpSent(true);
    }
  }

  async function handleVerifyOtp() {

    if (!otp.trim()) {
      return;
    }

    setVerifyingOtp(true);

    const result = await validateOtp(
      `${countryCode}${phoneNumber}`,
      otp
    );

    setVerifyingOtp(false);

    setOtpMessage(result.message);

    if (result.success) {

      setVerified(true);

      if (onVerified) {
        onVerified(true);
      }

    }
  }

  return (
    <div className="space-y-5">

      <div>

        <label className="block text-sm font-semibold text-slate-700">
          WhatsApp Number
          <span className="ml-1 text-red-500">*</span>
        </label>

        <div className="mt-2 flex gap-3">

          <select
            name="countryCode"
            value={countryCode}
            onChange={onChange}
            disabled={verified}
            className="
              w-28
              rounded-2xl
              border
              border-slate-300
              bg-white
              px-3
              py-3
            "
          >
            <option value="+91">🇮🇳 +91</option>
            <option value="+880">🇧🇩 +880</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+65">🇸🇬 +65</option>
            <option value="+971">🇦🇪 +971</option>
          </select>

          <input
            name="whatsappContactNo"
            value={phoneNumber}
            disabled={verified}
            onChange={onChange}
            placeholder="9876543210"
            className={`
              flex-1
              rounded-2xl
              border
              px-4
              py-3
              ${
                error
                  ? "border-red-400"
                  : "border-slate-300"
              }
            `}
          />

        </div>

        {error && (
          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>
        )}

      </div>

      {!otpSent && (

        <button
          type="button"
          disabled={sendingOtp}
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

      {otpSent && !verified && (

        <>

          <input
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            placeholder="Enter 6 digit OTP"
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              px-4
              py-3
            "
          />

          <button
            type="button"
            disabled={verifyingOtp}
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

      {verified && (

        <div
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-green-50
            p-4
            text-green-700
          "
        >
          <CircleCheck size={20} />

          WhatsApp number verified

        </div>

      )}

      {otpMessage && (

        <div
          className="
            rounded-xl
            bg-slate-100
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