import { ReactNode } from "react";

interface TrackLayoutProps {
  children: ReactNode;
}

export default function TrackLayout({
  children,
}: TrackLayoutProps) {
  return <>{children}</>;
}