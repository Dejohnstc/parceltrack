import {
  CheckCircle2,
  Clock3,
  MapPin,
  Truck,
} from "lucide-react";

import { TrackingEvent } from "@prisma/client";

interface RecentActivityProps {
  events: TrackingEvent[];
}

export default function RecentActivity({
  events,
}: RecentActivityProps) {
  return (
    <section className="rounded-3xl bg-white shadow-lg">
      <div className="border-b p-6">
        <h2 className="text-2xl font-bold">
          Recent Activity
        </h2>

        <p className="mt-2 text-slate-500">
          Latest shipment updates.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center py-16">
          <Clock3 className="mb-4 h-14 w-14 text-slate-300" />

          <h3 className="text-xl font-semibold">
            No Activity Yet
          </h3>

          <p className="mt-2 text-center text-slate-500">
            Shipment updates will appear here.
          </p>
        </div>
      ) : (
        <div className="divide-y">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex gap-5 p-6 transition hover:bg-slate-50"
            >
              <div className="mt-1 rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>

              <div className="flex-1">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {event.status.replaceAll(
                        "_",
                        " "
                      )}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="h-4 w-4" />

                      {event.location}
                    </div>
                  </div>

                  <div className="text-sm text-slate-400">
                    {new Intl.DateTimeFormat(
                      "en-US",
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }
                    ).format(
                      new Date(event.createdAt)
                    )}
                  </div>
                </div>

                <p className="mt-4 text-slate-600">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}