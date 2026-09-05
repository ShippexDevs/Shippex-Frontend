import {
  Ship,
  Hash,
  Anchor,
  MapPin,
} from "lucide-react";

function ShipDetailsCard({
  deliveryDestination,
  onChange,
  errors = {},
}) {
  const handleChange = (field, value) => {
    onChange({
      ...deliveryDestination,
      [field]: value,
    });
  };

  const handleIMOChange = (event) => {
    // Only allow numbers
    const value = event.target.value.replace(/\D/g, "").slice(0, 7);

    handleChange("imoNumber", value);
  };

  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        sm:p-6
      "
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#102A43]">
          Delivery Destination
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Confirm where your supply request should be delivered.
        </p>
      </div>

      <div className="space-y-5">

        {/* Ship Name */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Ship Name
          </label>

          <div className="relative">
            <Ship
              size={19}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={deliveryDestination.shipName}
              onChange={(event) =>
                handleChange("shipName", event.target.value)
              }
              placeholder="Enter ship name"
              className={`
                w-full
                rounded-2xl
                border
                bg-white
                py-3.5
                pl-11
                pr-4
                text-sm
                text-slate-900
                outline-none
                transition
                ${
                  errors.shipName
                    ? "border-red-400 focus:border-red-500"
                    : "border-slate-200 focus:border-[#087E8B]"
                }
              `}
            />
          </div>

          {errors.shipName && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.shipName}
            </p>
          )}
        </div>

        {/* IMO Number */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            IMO Number
          </label>

          <div className="relative">
            <Hash
              size={19}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              inputMode="numeric"
              maxLength={7}
              value={deliveryDestination.imoNumber}
              onChange={handleIMOChange}
              placeholder="Enter 7 digit IMO number"
              className={`
                w-full
                rounded-2xl
                border
                bg-white
                py-3.5
                pl-11
                pr-4
                text-sm
                text-slate-900
                outline-none
                transition
                ${
                  errors.imoNumber
                    ? "border-red-400 focus:border-red-500"
                    : "border-slate-200 focus:border-[#087E8B]"
                }
              `}
            />
          </div>

          {errors.imoNumber ? (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.imoNumber}
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-slate-400">
              Enter exactly 7 numeric digits.
            </p>
          )}
        </div>

        {/* Berth Number */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Berth Number
          </label>

          <div className="relative">
            <Anchor
              size={19}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={deliveryDestination.berthNumber}
              onChange={(event) =>
                handleChange(
                  "berthNumber",
                  event.target.value
                )
              }
              placeholder="Enter berth number"
              className={`
                w-full
                rounded-2xl
                border
                bg-white
                py-3.5
                pl-11
                pr-4
                text-sm
                text-slate-900
                outline-none
                transition
                ${
                  errors.berthNumber
                    ? "border-red-400 focus:border-red-500"
                    : "border-slate-200 focus:border-[#087E8B]"
                }
              `}
            />
          </div>

          {errors.berthNumber && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.berthNumber}
            </p>
          )}
        </div>

        {/* Port Name */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Port Name
          </label>

          <div className="relative">
            <MapPin
              size={19}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={deliveryDestination.portName}
              onChange={(event) =>
                handleChange(
                  "portName",
                  event.target.value
                )
              }
              placeholder="Enter port name"
              className={`
                w-full
                rounded-2xl
                border
                bg-white
                py-3.5
                pl-11
                pr-4
                text-sm
                text-slate-900
                outline-none
                transition
                ${
                  errors.portName
                    ? "border-red-400 focus:border-red-500"
                    : "border-slate-200 focus:border-[#087E8B]"
                }
              `}
            />
          </div>

          {errors.portName && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.portName}
            </p>
          )}
        </div>

      </div>
    </section>
  );
}

export default ShipDetailsCard;