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

export function CardsOptions() {
  const [isAutoGasFee, setIsAutoGasFee] = React.useState(true);
  const [isMainnet, setIsMainnet] = React.useState(true);
  const [numberTryMint, setNumberTryMint] = React.useState('');
  const [numberTrySwap, setNumberTrySwap] = React.useState('');

  React.useEffect(() => {
    const initTokenData = async () => {
      try {
        const data = await httpClient.request("/options", "GET");
        if (data && data.options) {
          const { isAutoGasFee, isMainnet, numberTryMint, numberTrySwap } = data.options;
          setIsAutoGasFee(isAutoGasFee);
          setIsMainnet(isMainnet);
          setNumberTryMint(numberTryMint);
          setNumberTrySwap(numberTrySwap);
        }
      } catch (error) {
        console.error("Error fetching options:", error);
        // Handle error if needed
      }
    };
  
    initTokenData();
  }, []);
  

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const data = await httpClient.request("/options", "POST",
        {
          isAutoGasFee,
          isMainnet,
          numberTryMint,
          numberTrySwap
        });
      if (data && data.options) {
        setIsAutoGasFee(data.options.isAutoGasFee);
        setIsMainnet(data.options.isMainnet);
        setNumberTryMint(data.options.numberTryMint);
        setNumberTrySwap(data.options.numberTrySwap);
      }
    } catch (error) {
      console.error("Error handling button click:", error);
      // Xử lý lỗi nếu cần
    }
  };

  const handleGasFee = () => { 
    setIsAutoGasFee(!isAutoGasFee); };
  const handleNetWork = () => { setIsMainnet(!isMainnet); };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Options</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="swap">Swap/Wallet</Label>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumberTrySwap(e.target.value.toString())}
              value={numberTrySwap}
              id="numberSwap"
              type="number"
              placeholder="0" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mint/Wallet</Label>
            <Input id="numberMint"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumberTryMint(e.target.value.toString())}
              type="number"
              placeholder="0"
              value={numberTryMint} />
          </div>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <Label htmlFor="auto_gasfees" className="flex flex-col space-y-1">
            <span>Automatically gas fees</span>
            <span className="text-xs font-normal leading-snug text-muted-foreground" style={{ wordWrap: 'break-word' }}>
              ON/OFF
            </span>
          </Label>
          <Switch
            id="auto_gasfees"
            checked={isAutoGasFee}
            aria-label="auto_gasfees"
            onClick={handleGasFee}
          />
        </div>
        <div className="flex items-center justify-between space-x-4">
          <Label htmlFor="network" className="flex flex-col space-y-1">
            <span>Network</span>
            <span className="text-xs font-normal leading-snug text-muted-foreground" style={{ wordWrap: 'break-word' }}>
              Mainnet/Testnet
            </span>
          </Label>
          <Switch id="network" defaultChecked={isMainnet} aria-label="network" onClick={handleNetWork} />
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
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleButtonClick}>Save</Button>
      </CardFooter>
    </Card>
  );
}
