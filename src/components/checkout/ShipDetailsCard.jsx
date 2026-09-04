import {
  Ship,
  Anchor,
  MapPin,
  Hash,
} from "lucide-react";

function ShipDetailsCard({
  deliveryDestination,
  onChange,
}) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        sm:p-6
      "
    >
      <div className="mb-6">

        <h2 className="text-lg font-bold text-[#102A43]">
          Delivery Destination
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Confirm where your supply request should be delivered.
        </p>

      </div>

      <div className="grid gap-5 sm:grid-cols-2">

        {/* Ship Name */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Ship size={16} />
            Ship Name
          </label>

          <input
            type="text"
            value={deliveryDestination.shipName}
            onChange={(e) =>
              handleChange("shipName", e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              text-sm
              outline-none
              transition
              focus:border-[#087E8B]
              focus:ring-2
              focus:ring-[#087E8B]/10
            "
          />
        </div>

        {/* IMO */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Hash size={16} />
            IMO Number
          </label>

          <input
            type="text"
            value={deliveryDestination.imoNumber}
            onChange={(e) =>
              handleChange("imoNumber", e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              text-sm
              outline-none
              transition
              focus:border-[#087E8B]
              focus:ring-2
              focus:ring-[#087E8B]/10
            "
          />
        </div>

        {/* Berth */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Anchor size={16} />
            Berth Number
          </label>

          <input
            type="text"
            value={deliveryDestination.berthNumber}
            onChange={(e) =>
              handleChange("berthNumber", e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              text-sm
              outline-none
              transition
              focus:border-[#087E8B]
              focus:ring-2
              focus:ring-[#087E8B]/10
            "
          />
        </div>

        {/* Port */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <MapPin size={16} />
            Port Name
          </label>

          <input
            type="text"
            value={deliveryDestination.portName}
            onChange={(e) =>
              handleChange("portName", e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              text-sm
              outline-none
              transition
              focus:border-[#087E8B]
              focus:ring-2
              focus:ring-[#087E8B]/10
            "
          />
        </div>

      </div>
    </section>
  );
}

export default ShipDetailsCard;