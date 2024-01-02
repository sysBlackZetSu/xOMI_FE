import { useTheme } from "next-themes";
import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { SunIcon } from "@radix-ui/react-icons";
import { MoonIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

const ModeSection: React.FC = () => {
  const { setTheme: setMode, resolvedTheme: mode } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [time, setTime] = React.useState(new Date());
  
  React.useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      // Cleanup the interval on component unmount
      clearInterval(intervalId);
    };
  }, []);

    // Get hours and minutes in 24-hour format
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">Mode</Label>
      <div className="grid grid-cols-3 gap-2">
        {mounted ? (
          <>
            <Button
              variant={"outline"}
              size="sm"
              onClick={() => setMode("light")}
              className={cn(mode === "light" && "border-2 border-primary")}
            >
              <SunIcon className="mr-1 -translate-x-1" />
              Light
            </Button>
            <Button
              variant={"outline"}
              size="sm"
              onClick={() => setMode("dark")}
              className={cn(mode === "dark" && "border-2 border-primary")}
            >
              <MoonIcon className="mr-1 -translate-x-1" />
              Dark
            </Button>
            <Button
              variant={"outline"}
              size="sm"
              onClick={() => {}}
              className={cn(mode === "dark" ? "border-2 bg-purple-950" : "border-2 bg-sky-500")}
            >
              <MoonIcon className="mr-1 -translate-x-1" />
              {`${hours}:${minutes}:${seconds}`}
            </Button>
          </>
        ) : (
          <>
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
          </>
        )}
      </div>
    </div>
  );
};

export default ModeSection;
