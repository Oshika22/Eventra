import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`bg-white rounded-2xl border border-orange-50 shadow-sm ${className}`.trim()}>{children}</div>;
}

