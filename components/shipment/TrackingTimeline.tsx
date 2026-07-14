import {
  CheckCircle2,
  Clock3,
  MapPin,
} from "lucide-react";

import {
  ShipmentStatus,
  TrackingEvent,
} from "@prisma/client";

interface TrackingTimelineProps {
  currentStatus: ShipmentStatus;
  events: TrackingEvent[];
}

const journey: ShipmentStatus[] = [
  "PENDING",
  "CREATED",
  "PICKED_UP",
  "ORIGIN_FACILITY",
  "IN_TRANSIT",
  "ARRIVED_HUB",
  "CUSTOMS",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

export default function TrackingTimeline({
  currentStatus,
  events,
}: TrackingTimelineProps) {
  const currentIndex = journey.indexOf(currentStatus);

  // Only show completed stages + current stage
  const visibleJourney = journey.slice(
    0,
    currentIndex + 1
  );

  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      {/* Header */}

      <div className="border-b p-6">
        <h2 className="text-2xl font-semibold">
          Tracking Timeline
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Follow your shipment as it progresses through
          our delivery network.
        </p>
      </div>

      {/* Timeline */}

      <div className="p-8">
        {visibleJourney.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center">
            <Clock3 className="mx-auto mb-4 h-10 w-10 text-slate-300" />

            <h3 className="text-lg font-semibold">
              No Tracking Events Yet
            </h3>

            <p className="mt-2 text-slate-500">
              Tracking updates will appear here once the
              shipment begins moving.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {visibleJourney.map((status, index) => {
              const current =
                status === currentStatus;

              const event = events.find(
                (e) => e.status === status
              );

              const description =
                event?.description ??
                (current
                  ? "Shipment is currently at this stage."
                  : "Shipment successfully completed this stage.");

              const location =
                event?.location ?? "--";

              const date = event
                ? new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(
                    new Date(event.createdAt)
                  )
                : "--";

              return (
                <div
                  key={status}
                  className="relative flex gap-5"
                >
                  {/* Timeline */}

                  <div className="flex flex-col items-center">

                    {current ? (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 ring-4 ring-orange-100">
                        <div className="h-3 w-3 rounded-full bg-white" />
                      </div>
                    ) : (
                      <CheckCircle2 className="h-7 w-7 text-green-600" />
                    )}

                    {index <
                      visibleJourney.length - 1 && (
                      <div className="mt-2 h-24 w-[2px] bg-green-500" />
                    )}

                  </div>

                  {/* Card */}

                  <div className="flex-1 rounded-xl border bg-slate-50 p-5 transition hover:bg-white hover:shadow-sm">

                    <div className="flex flex-wrap items-center justify-between gap-3">

                      <div>

                        <h3 className="text-lg font-semibold">
                          {status.replaceAll(
                            "_",
                            " "
                          )}
                        </h3>

                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                          <MapPin className="h-4 w-4" />

                          {location}
                        </div>

                      </div>

                      <div
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          current
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {current
                          ? "Current Status"
                          : "Completed"}
                      </div>

                    </div>

                    <p className="mt-4 leading-7 text-slate-600">
                      {description}
                    </p>

                    <div className="mt-5 border-t pt-4 text-sm text-slate-400">
                      {date}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}