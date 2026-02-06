import { useEffect, useMemo, useState } from "react";
import { getNextSlayPriceChange, getPackages } from "@/data/packages";
import { Package } from "@/types/booking";

export const usePackages = (): Package[] => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const nextChange = getNextSlayPriceChange(now);
    if (!nextChange) return;

    const msUntilChange = Math.max(0, nextChange.getTime() - now.getTime());
    const timeoutId = window.setTimeout(() => {
      setNow(new Date());
    }, msUntilChange);

    return () => window.clearTimeout(timeoutId);
  }, [now]);

  return useMemo(() => getPackages(now), [now]);
};
