import {
  Ship,
  Anchor,
  MapPin,
  Hash,
} from "lucide-react";

import { currentShip } from "../../data/currentShip";

function ShipDetailsCard() {
  const details = [
    {
      label: "Ship Name",
      value: currentShip.shipName,
      icon: Ship,
    },
    {
      label: "IMO Number",
      value: currentShip.imoNumber,
      icon: Hash,
    },
    {
      label: "Dock",
      value: currentShip.dockNumber,
      icon: Anchor,
    },
    {
      label: "Port",
      value: currentShip.portName,
      icon: MapPin,
    },
  ];

  return (
    <section className="
      rounded-2xl
      border
      border-slate-200
      bg-white
      p-5
      sm:p-6
    ">

      <div className="flex items-start gap-3">

        <div className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#EAF7F8]
        ">
          <Ship
            size={19}
            className="text-[#087E8B]"
          />
        </div>

        <div>
          <h2 className="
            text-base
            font-bold
            text-[#102A43]
          ">
            Vessel Details
          </h2>

          <p className="mt-0.5 text-xs text-slate-400">
            Delivery destination linked to your vessel.
          </p>
        </div>

      </div>

      <div className="
        mt-6
        grid
        grid-cols-2
        gap-5
        sm:grid-cols-4
      ">

        {details.map((detail) => {
          const Icon = detail.icon;

          return (
            <div
              key={detail.label}
              className="min-w-0"
            >

              <div className="
                mb-2
                flex
                items-center
                gap-1.5
              ">
                <Icon
                  size={13}
                  className="text-[#087E8B]"
                />

                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  {detail.label}
                </p>
              </div>

              <p className="
                truncate
                text-sm
                font-semibold
                text-[#102A43]
              ">
                {detail.value}
              </p>

            </div>
          );
        })}

      </div>

      <div className="
        mt-5
        inline-flex
        items-center
        gap-1.5
        rounded-full
        bg-emerald-50
        px-2.5
        py-1
        text-[10px]
        font-medium
        text-emerald-600
      ">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Linked to your profile
      </div>

    </section>
  );
}

export default ShipDetailsCard;