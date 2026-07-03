import {
  Package,
  Clock3,
  Truck,
  CheckCircle2,
  TrendingUp,
  Globe2,
} from "lucide-react";

interface StatsGridProps {
  total: number;
  pending: number;
  inTransit: number;
  delivered: number;
}

export default function StatsGrid({
  total,
  pending,
  inTransit,
  delivered,
}: StatsGridProps) {
  const deliveryRate =
    total > 0
      ? Math.round((delivered / total) * 100)
      : 0;

  const stats = [
    {
      title: "Total Shipments",
      value: total,
      icon: Package,
      color: "bg-orange-500",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock3,
      color: "bg-yellow-500",
    },
    {
      title: "In Transit",
      value: inTransit,
      icon: Truck,
      color: "bg-blue-500",
    },
    {
      title: "Delivered",
      value: delivered,
      icon: CheckCircle2,
      color: "bg-green-500",
    },
    {
      title: "Success Rate",
      value: `${deliveryRate}%`,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      title: "Countries",
      value: "220+",
      icon: Globe2,
      color: "bg-cyan-500",
    },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group overflow-hidden rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h3 className="mt-3 text-4xl font-bold text-slate-900">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${stat.color} text-white transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon size={30} />
              </div>
            </div>

            <div className="mt-8 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${stat.color}`}
                style={{
                  width:
                    typeof stat.value === "number"
                      ? `${Math.min(
                          stat.value * 10,
                          100
                        )}%`
                      : stat.title === "Success Rate"
                      ? `${deliveryRate}%`
                      : "100%",
                }}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}