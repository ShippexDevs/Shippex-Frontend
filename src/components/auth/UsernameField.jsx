import { CircleCheck, CircleX, Loader2 } from "lucide-react";

function UsernameField({
  value,
  onChange,
  onCheck,
  checking,
  available,
  error,
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        Username
        <span className="ml-1 text-red-500">*</span>
      </label>

      <div className="flex gap-3">
        <input
          name="username"
          value={value}
          onChange={onChange}
          placeholder="Choose a username"
          className={`
            flex-1
            rounded-2xl
            border
            bg-white
            px-4
            py-3
            outline-none
            transition
            focus:border-[#0F6E8C]
            focus:ring-2
            focus:ring-cyan-100
            ${
              error
                ? "border-red-400"
                : "border-slate-300"
            }
          `}
        />

        <button
          type="button"
          onClick={onCheck}
          disabled={!value.trim() || checking}
          className="
            rounded-2xl
            bg-[#0A2342]
            px-5
            text-white
            font-semibold
            disabled:bg-slate-400
          "
        >
          {checking ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            "Check"
          )}
        </button>
      </div>

      {available === true && (
        <div className="flex items-center gap-2 text-green-600">
          <CircleCheck size={18} />
          <span className="text-sm">
            Username available
          </span>
        </div>
      )}

      {available === false && (
        <div className="flex items-center gap-2 text-red-600">
          <CircleX size={18} />
          <span className="text-sm">
            Username already exists
          </span>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default UsernameField;