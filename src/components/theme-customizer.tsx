"use client";

import * as React from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { Paintbrush } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { useConfig } from "@/hooks/use-config";
import { DrawerContent, DrawerTrigger } from "@/components/drawer";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { Button } from "@/components/ui/button";
import { CardsCalendar } from "@/registry/default/example/cards/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { themes } from "@/registry/themes";

import "@/styles/mdx.css";
import { Drawer } from "vaul";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CustomizerHeader from "./customizer/customizer-header";
import ColorSection from "./customizer/color-section";
import ModeSection from "./customizer/mode-section";

export function ThemeCustomizer() {
  const [config, setConfig] = useConfig();
  const { resolvedTheme: mode } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <Drawer.Root>
        <DrawerTrigger asChild>
          <Button variant="outline" className="md:hidden">
            <Paintbrush className="w-4 h-4 mr-2" />
            Customize
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[85%] p-6 pt-10">
          <Customizer />
        </DrawerContent>
      </Drawer.Root>
      <div className="flex md:hidden">
        <div className="mr-2 hidden items-center space-x-0.5 lg:flex">
          {mounted ? (
            <>
              {["zinc", "rose", "blue", "green", "orange"].map((color) => {
                const theme = themes.find((theme) => theme.name === color);
                const isActive = config.theme === color;

                if (!theme) {
                  return null;
                }

                return (
                  <Tooltip key={theme.name}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() =>
                          setConfig({
                            theme: theme.name,
                            cssVars: theme.cssVars as any,
                            style: "default",
                          })
                        }
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs",
                          isActive
                            ? "border-[--theme-primary]"
                            : "border-transparent"
                        )}
                        style={
                          {
                            "--theme-primary": `hsl(${
                              theme?.activeColor[
                                mode === "dark" ? "dark" : "light"
                              ]
                            })`,
                          } as React.CSSProperties
                        }
                      >
                        <span
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-full bg-[--theme-primary]"
                          )}
                        >
                          {isActive && (
                            <CheckIcon className="w-4 h-4 text-white" />
                          )}
                        </span>
                        <span className="sr-only">{theme.label}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      align="center"
                      className="rounded-[0.5rem] bg-zinc-900 text-zinc-50"
                    >
                      {theme.label}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </>
          ) : (
            <div className="flex items-center mr-1 space-x-3">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
          )}
        </div>
        <Popover>
          <PopoverTrigger className="hidden md:flex" asChild>
            <Button variant="outline">
              <Paintbrush className="h-4 mr-2" />
              Customize
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="z-40 w-[30rem] rounded-[0.5rem] bg-white p-6 dark:bg-zinc-950"
          >
            <Customizer />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export function Customizer({ className }: { className?: string }) {
  return (
    <ThemeWrapper
      defaultTheme="zinc"
      className={cn(
        "fixed inset-y-0 right-0 flex flex-col h-screen max-w-[20rem] p-4 space-y-4 border-2 rounded-md shadow-sm backdrop-blur-sm bg-white/80 dark:bg-black/80 md:space-y-6",
        className
      )}
    >
      <CustomizerHeader />
      <div className="flex flex-col flex-1 space-y-4 md:space-y-6">
        <ModeSection />
        <CardsCalendar />
        <ColorSection />
      </div>
    </ThemeWrapper>
  );
}

