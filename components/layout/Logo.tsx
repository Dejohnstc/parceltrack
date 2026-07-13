import Link from "next/link";
import { Package } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md">
        <Package size={22} />
      </div>

      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          ValidXpress
        </h1>

        <p className="-mt-1 text-xs text-slate-500">
          Logistics & Courier
        </p>
      </div>
    </Link>
  );
}