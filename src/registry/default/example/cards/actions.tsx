"use client";
import * as React from "react";
import { Icons } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Label } from "@/registry/default/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";
import HttpClient from "@/lib/fetch";

const httpClient = new HttpClient();

export function CardsActions() {
  const [clickedAction, setClickedAction] = React.useState<string | null>(null);

  const handleAction = async (action: string) => {
    if (!clickedAction) {
      setClickedAction(action);

      try {
        const data = await httpClient.request("/action", "POST", { method: action });
        if (data && data.response) {
          // Xử lý thành công nếu cần
        }
        setClickedAction(null);
      } catch (error) {
        setClickedAction(null);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
        <CardDescription>Action to your account.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="" className="grid grid-cols- gap-4">
          {["buy", "mint", "swap"].map((action) => (
            <Label
              key={action}
              htmlFor={action}
              className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground ${clickedAction === action ? 'pointer-events-none opacity-50' : ''
                } [&:has([data-state=checked])]:border-primary`}
            >
              <RadioGroupItem
                value={action}
                id={action}
                className="sr-only"
                aria-label={action}
                onClick={() => handleAction(action)}
                disabled={clickedAction !== null && clickedAction !== action}
                autoFocus={clickedAction === action}
              />
              {action === "buy" && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mb-3 h-6 w-6"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                  Buy
                </>
              )}
              {action === "mint" && (
                <>
                  <Icons.paypal className="mb-3 h-6 w-6" />
                  Mint
                </>
              )}
              {action === "swap" && (
                <>
                  <Icons.apple className="mb-3 h-6 w-6" />
                  Swap
                </>
              )}
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <CardDescription>[2023:12:12] Buy or mint</CardDescription>
      </CardFooter>
    </Card>
  );
}