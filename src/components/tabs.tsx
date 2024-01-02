"use client";

import * as React from "react";

import { useConfig } from "@/hooks/use-config";
import { ThemeWrapper } from "@/components/theme-wrapper";
import CardsDefault from "@/registry/default/example/cards";

export function ThemesTabs() {
  const [mounted, setMounted] = React.useState(false);
  const [config] = useConfig();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full">
      {!mounted ? (
        <div className="grid md:grids-col-2 md:gap-4 lg:grid-cols-10 xl:gap-6"></div>
      ) : (
        <ThemeWrapper className="max-w-7xl">
          {config.style === "default" && <CardsDefault />}
        </ThemeWrapper>
      )}
    </div>
  );
}
