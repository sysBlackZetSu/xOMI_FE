"use client";

import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Send } from "lucide-react";
import { Label } from "@/registry/default/ui/label";
import { Switch } from "@/registry/default/ui/switch";

export function CardsCookieSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>RPC List</CardTitle>
        <CardDescription>Manage your rpc settings here.</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.currentTarget.message.value = "";
            }}
            className="flex items-center w-full space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your private key..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <Label htmlFor="necessary" className="flex flex-col space-y-1">
            <span>Quick Node</span>
            <span className="text-xs font-normal leading-snug text-muted-foreground">
              https://docs.infura.io/networks/bnb-smart-chain
            </span>
          </Label>
          <Switch id="necessary" defaultChecked aria-label="Necessary" />
        </div>
        <div className="flex items-center justify-between space-x-4">
          <Label htmlFor="functional" className="flex flex-col space-y-1">
            <span>Binance</span>
            <span className="text-xs font-normal leading-snug text-muted-foreground">
              https://docs.infura.io/networks/bnb-smart-chain
            </span>
          </Label>
          <Switch id="functional" aria-label="Functional" />
        </div>
        <div className="flex items-center justify-between space-x-4">
          <Label htmlFor="performance" className="flex flex-col space-y-1">
            <span>Infura</span>
            <span className="text-xs font-normal leading-snug text-muted-foreground">
              https://docs.infura.io/networks/bnb-smart-chain
            </span>
          </Label>
          <Switch id="performance" aria-label="Performance" />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
