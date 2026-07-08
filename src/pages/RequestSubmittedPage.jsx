import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function RequestSubmittedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F8FA] flex items-center justify-center px-5">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg text-center">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2
            size={56}
            className="text-green-600"
          />
        </div>

        <h1 className="mt-8 text-3xl font-bold">
          Supply Request Submitted
        </h1>

        <p className="mt-4 text-slate-500 leading-7">
          Your request has been sent to our operations team.
          An executive will review it shortly.
        </p>

        <div className="mt-8 rounded-2xl bg-slate-50 p-5">

          <p className="text-sm text-slate-500">
            Request ID
          </p>

          <h2 className="mt-1 text-xl font-bold">
            REQ-2026000125
          </h2>

          <p className="mt-5 text-sm text-slate-500">
            Estimated Response
          </p>

          <h3 className="font-semibold">
            10–15 Minutes
          </h3>

        </div>

        <button
          onClick={() => navigate("/orders")}
          className="
            mt-8
            w-full
            rounded-2xl
            bg-[#0A2342]
            py-4
            font-semibold
            text-white
          "
        >
          Track Request
        </button>

        <button
          onClick={() => navigate("/")}
          className="
            mt-4
            w-full
            rounded-2xl
            border
            border-slate-300
            py-4
            font-semibold
          "
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
}

export default RequestSubmittedPage;