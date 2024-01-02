"use client";

import * as React from "react";
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
import { Switch } from "@/registry/default/ui/switch";
import HttpClient from "@/lib/fetch";

const httpClient = new HttpClient();

export function CardsSwapToken() {
  const [isShow, setIsShow] = React.useState(true);
  const [gasLimit, setGasLimit] = React.useState("0");
  const [gasWei, setGasWei] = React.useState("0");
  const [amountSell, setAmountSell] = React.useState("0");
  const [feeEstimate, setFeeEstimate] = React.useState("0");
  const [quantity, setQuantity] = React.useState("0");
  const [bnbInWallet, setBnbInWallet] = React.useState("0");
  const [totalBnb, setTotalBnb] = React.useState("0");
  const [totalUsdt, setTotalUsdt] = React.useState("0");

  const handleSwitchToggle = () => {
    setIsShow(!isShow);
  };

  React.useEffect(() => {
    const initSwapSettings = async () => {
      const data = await httpClient.request("/swap_settings", "GET");
      if (data && data.swap_response) {
        const {
          gasLimit,
          gasWei,
          amountSell,
          feeEstimate,
          quantity,
          bnbInWallet,
          totalBnb,
          totalUsdt
        } = data.swap_response;
        setGasLimit(gasLimit);
        setGasWei(gasWei);
        setAmountSell(amountSell);
        setFeeEstimate(feeEstimate);
        setQuantity(quantity);
        setBnbInWallet(bnbInWallet);
        setTotalBnb(totalBnb);
        setTotalUsdt(totalUsdt);
      }
    };
    initSwapSettings();
  }, []);

  const handleSaveClick = async () => {
    try {
      const data = await httpClient.request("/swap_settings", "POST",
        {
          gasLimit,
          gasWei,
          amountSell
        });
      if (data && data.swap_response) {
        const {
          gasLimit,
          gasWei,
          amountSell,
          feeEstimate,
          quantity,
          bnbInWallet,
          totalBnb,
          totalUsdt
        } = data.swap_response;
        setGasLimit(gasLimit);
        setGasWei(gasWei);
        setAmountSell(amountSell);
        setFeeEstimate(feeEstimate);
        setQuantity(quantity);
        setBnbInWallet(bnbInWallet);
        setTotalBnb(totalBnb);
        setTotalUsdt(totalUsdt);
      }
    } catch (error) {
      console.error("[handleSaveClick] :", error);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1" style={{ position: 'relative' }}>
        <CardTitle className="text-2xl">Swap Token
          <Switch
            id="show"
            defaultChecked={isShow}
            aria-label="swapNFT"
            onClick={handleSwitchToggle}
            style={{ position: 'absolute', top: 25, right: 20 }}
          />
        </CardTitle>
      </CardHeader>
      {isShow && (
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="gasLimit">Gas Limit</Label>
              <Input
                id="gasLimit"
                type="number"
                placeholder="1000000"
                value={gasLimit}
                onChange={(e) => setGasLimit(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gasWei">Gas Wei</Label>
              <Input
                id="gasWei"
                type="number"
                placeholder="1000000"
                value={gasWei}
                onChange={(e) => setGasWei(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="amountSell">Amount Sell</Label>
              <Input
                id="amountSell"
                type="number"
                placeholder="50"
                value={amountSell}
                onChange={(e) => setAmountSell(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="feeEstimate">Fee Estimate</Label>
              <Input
                id="feeEstimate"
                type="number"
                placeholder="1000000"
                value={feeEstimate}
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity In Wallet</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="0"
                value={quantity}
                readOnly
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bnbInWallet">BNB In Wallet</Label>
              <Input
                id="bnbInWallet"
                type="number"
                placeholder="0"
                value={bnbInWallet}
                readOnly
              />
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
            <Label htmlFor="bnb">Total (BNB)</Label>
            <Input
              id="bnb"
              type="text"
              placeholder="0"
              value={totalBnb}
              readOnly
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="usdt">Total (USDT)</Label>
            <Input
              id="usdt"
              type="text"
              placeholder="0"
              value={totalUsdt}
              readOnly
            />
          </div>
        </CardContent>
      )}
      {isShow && (
        <CardFooter>
          <Button className="w-full" onClick={handleSaveClick}>
            Save
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
