"use client";

import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export function CardsCreateAccount() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Environment</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="gasLimit">Gas Limit</Label>
            <Input id="gasLimit" type="number" placeholder="1000000" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Gas Wei</Label>
            <Input id="gasWei" type="number" placeholder="1000000" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="amountSell">Amount Sell</Label>
            <Input id="amountSell" type="number" placeholder="50" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Gas Wei</Label>
            <Input id="gasWei" type="number" placeholder="1000000" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity In Wallet</Label>
            <Input id="quantity" type="number" placeholder="0" readOnly/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bnbInWallet">BNB In Wallet</Label>
            <Input id="bnbInWallet" type="number" placeholder="0" readOnly/>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              APT-ROOT
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Total (BNB)</Label>
          <Input id="bnb" type="text" placeholder="0" readOnly/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Total (USDT)</Label>
          <Input id="usdt" type="text" placeholder="0" readOnly/>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save</Button>
      </CardFooter>
    </Card>
  );
}
