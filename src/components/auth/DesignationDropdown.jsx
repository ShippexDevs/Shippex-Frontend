const designations = [
  "MASTER",
  "CHIEF_OFFICER",
  "SECOND_OFFICER",
  "THIRD_OFFICER",
  "DECK_CADET",
  "BOSUN",
  "ABLE_SEAMAN",
  "ORDINARY_SEAMAN",
  "CHIEF_ENGINEER",
  "SECOND_ENGINEER",
  "THIRD_ENGINEER",
  "FOURTH_ENGINEER",
  "JUNIOR_ENGINEER",
  "ENGINE_CADET",
  "OILER",
  "WIPER",
  "MOTORMAN",
  "FITTER",
  "ELECTRO_TECHNICAL_OFFICER",
  "ELECTRICIAN",
  "CHIEF_COOK",
  "SECOND_COOK",
  "MESSMAN",
  "STEWARD",
  "CHIEF_STEWARD",
  "PUMPMAN",
];

function DesignationDropdown({
  value,
  onChange,
  error,
}) {
  return (
    <div className="space-y-2">

      <label className="block text-sm font-semibold text-slate-700">
        Designation
        <span className="ml-1 text-red-500">*</span>
      </label>

      <select
        value={value}
        onChange={onChange}
        name="designation"
        className={`
          w-full
          rounded-2xl
          border
          bg-white
          px-4
          py-3
          ${
            error
              ? "border-red-400"
              : "border-slate-300"
          }
        `}
      >

        <option value="">
          Select Designation
        </option>

        {designations.map((designation) => (
          <option
            key={designation}
            value={designation}
          >
            {designation
              .replaceAll("_", " ")}
          </option>
        ))}

      </select>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}

export default DesignationDropdown;