"use client";

import { Search } from "lucide-react";

interface ShipmentFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}

export default function ShipmentFilters({
  search,
  setSearch,
  status,
  setStatus,
}: ShipmentFiltersProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search Tracking Number..."
            className="w-full rounded-2xl border py-3 pl-12 pr-4 outline-none transition focus:border-orange-500"
          />
        </div>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="rounded-2xl border px-4 py-3 outline-none transition focus:border-orange-500"
        >
          <option value="ALL">
            All Statuses
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="IN_TRANSIT">
            In Transit
          </option>

          <option value="DELIVERED">
            Delivered
          </option>

          <option value="OUT_FOR_DELIVERY">
            Out For Delivery
          </option>

          <option value="CUSTOMS">
            Customs
          </option>
        </select>
      </div>
    </div>
    );
}