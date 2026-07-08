import {
  Ship,
  Anchor,
  MapPin,
  Hash,
} from "lucide-react";

import { currentShip } from "../../data/currentShip";

function ShipDetailsCard() {
  return (
    <section
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-md
      "
    >
      <h2 className="text-xl font-bold text-[#0A2342]">
        Delivery Destination
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        This information is linked to your assigned vessel.
      </p>

      <div className="mt-6 space-y-5">

        {/* Ship Name */}

        <div className="flex items-start gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-cyan-100
            "
          >
            <Ship
              size={22}
              className="text-[#0F6E8C]"
            />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Ship Name
            </p>

            <h3 className="font-semibold">
              {currentShip.shipName}
            </h3>
          </div>

        </div>

        {/* IMO */}

        <div className="flex items-start gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-cyan-100
            "
          >
            <Hash
              size={22}
              className="text-[#0F6E8C]"
            />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              IMO Number
            </p>

            <h3 className="font-semibold">
              {currentShip.imoNumber}
            </h3>
          </div>

        </div>

        {/* Dock */}

        <div className="flex items-start gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-cyan-100
            "
          >
            <Anchor
              size={22}
              className="text-[#0F6E8C]"
            />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Dock Number
            </p>

            <h3 className="font-semibold">
              {currentShip.dockNumber}
            </h3>
          </div>

        </div>

        {/* Port */}

        <div className="flex items-start gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-cyan-100
            "
          >
            <MapPin
              size={22}
              className="text-[#0F6E8C]"
            />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Port
            </p>

            <h3 className="font-semibold">
              {currentShip.portName}
            </h3>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ShipDetailsCard;